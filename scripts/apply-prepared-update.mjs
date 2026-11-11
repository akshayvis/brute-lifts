import { readFileSync, writeFileSync } from "node:fs";

const edit = (path, transform) => writeFileSync(path, transform(readFileSync(path, "utf8")));

edit("app/model.ts", (source) => {
  if (!source.includes("dumbbellbench")) {
    source = source.replace(
      "ex('lat'",
      "ex('dumbbellbench','Dumbbell bench press','Chest · triceps · front shoulders',[8,10],null,'per dumbbell','chest','Keep feet planted and shoulder blades supported. Lower the dumbbells with control, keeping wrists stacked over elbows, then press without letting your shoulders roll forward.'),\nex('lat'",
    );
    source = source.replace(
      "export function makeSession",
      "export function nextBenchId(state:State){const last=[...state.events].reverse().filter(s=>s.kind==='workout').flatMap(s=>[...s.items].reverse()).find(i=>i.base==='bench'&&(i.id==='bench'||i.id==='dumbbellbench')&&i.sets.some(set=>set.done));return last?.id==='bench'?'dumbbellbench':'bench';}\nexport function makeSession",
    );
    source = source.replace(
      "templates[state.next].map(id=>makeItem(state,id))",
      "templates[state.next].map(id=>makeItem(state,id==='bench'?nextBenchId(state):id))",
    );
  }
  return source;
});

edit("app/journal.tsx", (source) => {
  source = source
    .replace("{completed}/18 sets logged", "{completed} sets logged")
    .replace(
      "Three working sets per exercise. Suggested weights are editable; only checked sets count as completed.",
      "Three working sets per exercise by default. Add a set whenever you need one; only checked sets count as completed.",
    );
  if (!source.includes('className="add-set"')) {
    source = source.replace(
      ')}<label className="difficulty">',
      ')}<button className="add-set" type="button" disabled={!active||item.sets.length>=10} onClick={()=>{const previous=item.sets.at(-1)!;itemChange(n,{...item,sets:[...item.sets,{weight:previous.weight,reps:previous.reps||"10",done:false}]})}}><Plus size={15}/>Add set</button><p className="set-note">Add an extra working set, or lower the copied weight for a back-off set.</p><label className="difficulty">',
    );
  }
  return source;
});

edit("app/globals.css", (source) =>
  source.includes(".add-set{")
    ? source
    : source + "\n.add-set{margin-top:5px;padding:8px 11px;font-size:12px;background:#f5f8ef;color:#4e6a3c;border-color:#dbe6cf}.set-note{font-size:11px;color:var(--muted);margin:7px 0 0}\n",
);
