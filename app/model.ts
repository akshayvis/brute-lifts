export const newId=()=>Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,'0')).join('');
export type Exercise={id:string;name:string;muscle:string;reps:[number,number];weight:number|null;unit:string;group:string;tip:string};
const ex=(id:string,name:string,muscle:string,reps:[number,number],weight:number|null,unit:string,group:string,tip:string):Exercise=>({id,name,muscle,reps,weight,unit,group,tip});
export const exercises:Exercise[]=[
ex('bench','Barbell bench press','Chest · triceps · front shoulders',[8,10],65,'total incl. bar','chest','Keep feet planted and shoulder blades supported. Lower to a comfortable chest position with wrists stacked over forearms; use safeties or a spotter.'),
ex('dumbbellbench','Dumbbell bench press','Chest · triceps · front shoulders',[8,10],null,'per dumbbell','chest','Keep feet planted and shoulder blades supported. Lower the dumbbells with control, keeping wrists stacked over elbows, then press without letting your shoulders roll forward.'),
ex('lat','CL3102 neutral pulldown','Lats · biceps',[8,12],110,'stack','pull','Secure thighs under the pad. Pull elbows toward your ribs without swinging or pulling behind your neck.'),
ex('row','Chest-supported mid row','Mid-back · rear shoulders',[8,12],60,'stack','row','Keep your chest on the pad. Draw elbows back without shrugging; return with control.'),
ex('bayesian','Bayesian cable curl','Biceps',[10,12],20,'per arm','curl','Keep the upper arm steady slightly behind your torso. Curl without leaning or rolling the shoulder forward.'),
ex('pushdown','Straight-bar pushdown','Triceps',[10,12],30,'stack','triceps','Keep elbows near your sides and wrists neutral. Extend without swinging your torso or forcing the elbow lockout.'),
ex('lateral','Atlantis lateral raise','Side shoulders',[10,15],null,'stack','shoulder','Align shoulders with the machine pivot. Raise smoothly toward shoulder height without shrugging.'),
ex('legpress','Leg press','Quads · glutes',[10,12],160,'stack','squat','Keep your pelvis against the pad and knees tracking with toes. Lower only as far as you can without rounding your lower back.'),
ex('seatedcurl','Seated leg curl','Hamstrings',[10,12],80,'stack','hamstring','Align knees with the pivot and secure the thigh pad. Curl smoothly without lifting your hips.'),
ex('extension','Leg extension','Quads',[10,12],60,'stack','quad','Align your knees with the pivot. Extend under control and avoid kicking or snapping into lockout.'),
ex('back','TRUE Lower Back Extension','Spinal erectors',[10,12],20,'stack','back','Adjust the seat and pad to the machine instructions. Move through a comfortable range and avoid forceful hyperextension.'),
ex('rotary','Rotary calf raise','Calves',[12,15],135,'displayed load','calf','Keep the balls of your feet secure. Use a controlled stretch and full comfortable rise without bouncing.'),
ex('abs','TRUE ab crunch','Abdominals',[12,15],40,'stack','abs','Bring ribs toward your pelvis while exhaling. Avoid pulling mainly with your arms or jerking your neck.'),
ex('incline','MTS incline press','Upper chest · triceps',[8,10],35,'per side','chest','Set handles near upper-chest height. Keep shoulder blades supported and forearms aligned with the handles.'),
ex('front','MTS front pulldown','Lats · biceps',[8,12],40,'per side','pull','Keep ribs controlled and shoulders away from ears. Drive elbows down without swinging backward.'),
ex('preacher','Preacher curl','Biceps',[10,12],50,'stack','curl','Keep upper arms on the pad. Lower slowly without forcing straight elbows at the bottom.'),
ex('hammer','HOIST rope hammer curl','Brachialis · forearms · biceps',[10,12],25,'stack','curl','Keep a neutral grip and elbows steady. Curl without using momentum from your hips.'),
ex('overhead','HOIST overhead rope extension','Triceps · long-head emphasis',[10,12],25,'stack','triceps','Brace your torso with ribs down. Bend and extend elbows while keeping upper arms reasonably still.'),
ex('squat','Booty Builder Back Squat','Quads · glutes',[8,12],null,'machine load · use a consistent convention','squat','Set the safety stops before starting. Brace your torso and let knees track with toes through a controlled, comfortable depth.'),
ex('horizontalcurl','TRUE horizontal leg curl','Hamstrings',[10,12],75,'stack','hamstring','Align knees with the pivot and keep hips against the pad. Curl without arching your lower back.'),
ex('hip','Booty Builder hip thrust','Glutes',[10,12],25,'added per side','glutes','Position the belt or pad securely over the hips. Keep ribs down and finish by squeezing glutes, not arching your back.'),
ex('truehip','TRUE Hip Thruster','Glutes',[10,12],null,'displayed load','glutes','Set the pad comfortably across your hips and keep your ribs down. Drive through your feet, pause with glutes squeezed, and do not finish by arching your lower back.'),
ex('glute','TRUE glute press','Glutes',[10,12],30,'displayed load · each leg','glutes','Keep your pelvis square and torso supported. Press through a controlled range without twisting your lower back.'),
ex('horizontalcalf','Horizontal calf raise','Calves',[12,15],null,'displayed load','calf','Keep forefeet secure on the platform. Move through a comfortable ankle range and pause rather than bouncing.'),
ex('pendulum','TRUE pendulum squat','Quads · glutes',[8,12],null,'machine load · use a consistent convention','squat','Set the stops and keep your back against the pad. Track knees with toes; use a controlled depth you can reverse smoothly.'),
ex('truerow','TRUE Palladium seated row','Mid-back · rear shoulders',[8,12],null,'stack','row','Adjust the seat so handles align comfortably with your torso. Keep your chest supported and avoid shrugging.')];
export const byId=Object.fromEntries(exercises.map(e=>[e.id,e]));
export const rotation=['Upper A','Lower A','Upper B','Lower B'];
export const templates=[['bench','lat','row','bayesian','pushdown','lateral'],['legpress','seatedcurl','extension','back','rotary','abs'],['incline','row','front','preacher','hammer','overhead'],['squat','horizontalcurl','truehip','glute','horizontalcalf','abs']];
export type SetLog={weight:string;reps:string;done:boolean};
export type Item={base:string;id:string;sets:SetLog[];difficulty:string};
export type Session={id:string;date:string;kind:'workout'|'skip';index:number;items:Item[];note:string;cardio:{type:string;minutes:string;level:string;rpm:string;speed:string;incline:string;done:boolean;skipped:boolean}};
export type State={next:number;events:Session[];draft:Session|null;approved:Record<string,number>};
export const emptyCardio=()=>({type:'Elliptical',minutes:'25',level:'6',rpm:'50–55',speed:'',incline:'',done:false,skipped:false});
export function initialState():State{return {next:3,events:[{id:'initial-skip',date:'2026-11-08',kind:'skip',index:3,items:[],note:'Skipped; Lower B moved to next visit.',cardio:{...emptyCardio(),minutes:''}}],draft:null,approved:{}}}
export function latest(state:State,id:string){return [...state.events].reverse().filter(s=>s.kind==='workout').flatMap(s=>s.items).find(i=>i.id===id&&i.sets.some(s=>s.done));}
export function suggestion(state:State,id:string){if(state.approved[id]!==undefined)return state.approved[id]; const last=latest(state,id);return last?Number(last.sets.filter(s=>s.done).at(-1)!.weight):byId[id].weight;}
export function makeItem(state:State,id:string,base=id):Item {const e=byId[id],w=suggestion(state,id);return {base,id,sets:Array.from({length:3},()=>({weight:w===null?'':String(w),reps:'10',done:false})),difficulty:''};}
export function nextBenchId(state:State){const last=[...state.events].reverse().filter(s=>s.kind==='workout').flatMap(s=>[...s.items].reverse()).find(i=>i.base==='bench'&&(i.id==='bench'||i.id==='dumbbellbench')&&i.sets.some(set=>set.done));return last?.id==='bench'?'dumbbellbench':'bench';}
export function makeSession(state:State,date:string):Session {return {id:newId(),date,kind:'workout',index:state.next,items:templates[state.next].map(id=>makeItem(state,id==='bench'?nextBenchId(state):id)),note:'',cardio:emptyCardio()};}
export function proposals(state:State){return exercises.flatMap(e=>{const last=latest(state,e.id);if(!last||last.difficulty!=='Easy'||last.sets.filter(s=>s.done).length<3)return [];const sets=last.sets.filter(s=>s.done);const w=Number(sets[0].weight);if(!sets.every(s=>Number(s.reps)>=e.reps[1]&&Number(s.weight)===w)||state.approved[e.id]!==undefined)return [];return [{id:e.id,from:w,to:w+5}];});}
export function finish(state:State):State{const d=state.draft;if(!d)throw Error('Start a workout first.');if(!d.items.some(i=>i.sets.some(s=>s.done))&&!d.cardio.done)throw Error('Log at least one completed set or cardio session.');const approved={...state.approved};for(const i of d.items)if(i.sets.some(s=>s.done))delete approved[i.id];return {...state,next:(d.index+1)%4,draft:null,events:[...state.events,d],approved};}
