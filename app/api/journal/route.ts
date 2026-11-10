import {getChatGPTUser} from '../../chatgpt-auth';
import {getDb} from '../../../db';
import {journals} from '../../../db/schema';
import {and,eq} from 'drizzle-orm';
import {initialState,byId} from '../../model';
import {z} from 'zod';
const num=z.string().refine(s=>s===''||Number.isFinite(Number(s))&&Number(s)>=0&&Number(s)<=5000);
const set=z.object({weight:num,reps:num,done:z.boolean()}).refine(s=>!s.done||(s.weight!==''&&s.reps!==''&&Number(s.reps)>0&&Number.isInteger(Number(s.reps))));
const item=z.object({base:z.string().refine(s=>!!byId[s]),id:z.string().refine(s=>!!byId[s]),sets:z.array(set).max(10),difficulty:z.enum(['','Easy','Moderate','Hard'])});
const session=z.object({id:z.string().max(100),date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),kind:z.enum(['workout','skip']),index:z.number().int().min(0).max(3),items:z.array(item).max(6),note:z.string().max(2000),cardio:z.object({type:z.enum(['Elliptical','Treadmill']),minutes:num,level:num,rpm:z.string().max(30),speed:num,incline:num,done:z.boolean(),skipped:z.boolean().default(false)}).refine(c=>!c.done||(Number(c.minutes)>0))});
const stateSchema=z.object({next:z.number().int().min(0).max(3),events:z.array(session).max(10000),draft:session.nullable(),approved:z.record(z.number().min(0).max(5000))});
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){const user=await getChatGPTUser();if(!user)return json({error:'Sign in to access your journal.'},401);const db=getDb();await db.insert(journals).values({owner:user.userId,data:JSON.stringify(initialState()),revision:0}).onConflictDoNothing();const [row]=await db.select().from(journals).where(eq(journals.owner,user.userId));return json({state:JSON.parse(row.data),revision:row.revision});}
export async function PUT(request:Request){const user=await getChatGPTUser();if(!user)return json({error:'Sign in to save your journal.'},401);const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return json({error:'Invalid origin'},403);let body;try{body=await request.json()}catch{return json({error:'Invalid request'},400)}const parsed=z.object({revision:z.number().int().min(0),state:stateSchema}).safeParse(body);if(!parsed.success)return json({error:'Check weights, reps, and completed cardio duration.'},400);const {state,revision}=parsed.data;const result=await getDb().update(journals).set({data:JSON.stringify(state),revision:revision+1}).where(and(eq(journals.owner,user.userId),eq(journals.revision,revision))).returning({revision:journals.revision});if(!result.length)return json({error:'This journal changed on another device. Reload the latest version before editing.'},409);return json({revision:revision+1});}
