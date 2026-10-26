// ===== OBJEK, KAMERA & EFEK PER LIRIK (edit di sini) =====
// Objek garis SVG (viewBox 100x100) + jenis gerak diam-nya
const OB={
lamp:['<path d="M50 96V28M38 96H62M50 28Q50 12 68 12M58 12H82L77 26H63Z"/><circle class="win" cx="70" cy="31" r="3"/>','flick'],
house:['<path d="M16 94V48L50 18L84 48V94ZM42 94V70H58V94M66 36V20H76V44"/><rect class="win" x="24" y="58" width="12" height="12"/><rect class="win" x="64" y="58" width="12" height="12"/>','bob'],
tree:['<path d="M50 6L28 38H40L20 66H36L12 92H88L64 66H80L60 38H72ZM46 92V99H54V92"/><circle cx="42" cy="56" r="2.5"/><circle cx="58" cy="76" r="2.5"/><circle cx="50" cy="38" r="2.5"/>','sway'],
clock:['<circle cx="50" cy="50" r="40"/><path d="M50 10V16M90 50H84M50 90V84M10 50H16M50 50L68 60"/><path class="hand" d="M50 50V20"/>','pulse'],
figure:['<circle cx="50" cy="20" r="10"/><path d="M50 30V62M50 38L32 54M50 38L68 54M50 62L38 94M50 62L62 94"/>','bob'],
phone:['<path d="M30 6H70Q76 6 76 12V88Q76 94 70 94H30Q24 94 24 88V12Q24 6 30 6ZM42 12H58M46 86H54"/><path class="wv" d="M84 28Q94 40 84 52M90 20Q106 40 90 60"/>','pulse'],
flame:['<path d="M50 94C26 94 20 70 34 52C38 62 44 62 44 54C44 38 52 30 56 8C70 28 82 44 78 68C76 84 66 94 50 94ZM50 94C42 94 38 84 46 74C50 80 56 80 58 72C64 84 60 94 50 94Z"/>','flick'],
heart:['<path d="M50 90L14 54C2 40 10 18 28 20C38 21 46 28 50 36C54 28 62 21 72 20C90 18 98 40 86 54ZM50 36L42 50L56 60L46 74"/>','pulse'],
bubble:['<path d="M12 14H88V62H46L28 82V62H12ZM26 30H74M26 46H56"/>','sway'],
star:['<path d="M50 6L61 38H94L67 58L78 92L50 72L22 92L33 58L6 38H39Z"/>','spin'],
ticket:['<path d="M8 28H92V44A6 6 0 0 0 92 56V72H8V56A6 6 0 0 0 8 44ZM66 28V72"/>','sway'],
eye:['<path d="M4 50Q50 8 96 50Q50 92 4 50Z"/><circle cx="50" cy="50" r="16"/><circle cx="50" cy="50" r="6"/>','pulse'],
case:['<path d="M14 34H86V88H14ZM36 34V22H64V34M14 58H86M44 54H56V62H44Z"/>','bob'],
bolt:['<path d="M58 4L20 56H46L38 96L80 40H54Z"/>','flick'],
metro:['<path d="M30 94L42 8H58L70 94Z"/><g class="pen"><path d="M50 84V22M44 38H56V46H44Z"/></g>','bob'],
carousel:['<path d="M8 36L50 10L92 36ZM50 10V3M14 36H86M26 36V80M50 36V80M74 36V80M6 88H94M10 80H90"/>','sway']
};
// lirik (regex) -> [objek besar, objek kecil melayang]. Yang cocok pertama dipakai.
const OM=[
[/street ?light|flicker/i,['lamp','star']],[/tempo|uptight/i,['metro','clock']],[/moment|strangely/i,['clock','star']],
[/gone|everybody|out on your own/i,['figure','lamp']],[/anger/i,['bolt','flame']],[/halls|haunted|home/i,['house','figure']],
[/golden/i,['star','heart']],[/awful|mine/i,['heart','bolt']],[/tell|told/i,['bubble','eye']],[/hold me|know me/i,['figure','heart']],
[/burn/i,['flame','flame']],[/died slow/i,['clock','flame']],[/toughest|happened/i,['eye','clock']],[/carousel/i,['carousel','ticket']],
[/ticket|gaze/i,['ticket','eye']],[/baggage/i,['case','figure']],[/father/i,['figure','eye']],[/line|kid/i,['phone','figure']],
[/magic|sold/i,['star','star']],[/call me/i,['phone','phone']],[/not yours/i,['heart','figure']],[/merry christmas/i,['tree','star']],[/call/i,['phone','tree']]
];
// efek per lirik: f=kilat layar, s=guncang kamera, b=percikan, d=gelap sesaat
const EF=[[/anger/i,'fs'],[/burn/i,'fb'],[/merry christmas|not yours/i,'fsb'],[/golden|magic/i,'b'],[/gone|moment|died slow/i,'d'],[/call me/i,'s']];
// shot kamera: [x(lebar layar), y(tinggi layar), zoom, putar(derajat)] dari a ke b
const SH=[
{a:[0,0,1.02,0],b:[0,0,1.2,0]},{a:[0,0,1.25,0],b:[0,0,1,0]},{a:[.07,0,1.1,0],b:[-.07,0,1.1,0]},{a:[-.07,0,1.1,0],b:[.07,0,1.1,0]},
{a:[0,.06,1.12,0],b:[0,-.06,1.12,0]},{a:[0,0,1.1,-3],b:[0,0,1.18,3]},{a:[0,0,1.7,0],b:[0,0,1.05,0]},{a:[.05,.04,1.15,2],b:[-.05,-.04,1.25,-2]}
];
const SM={slam:6,burn:0,ring:7,call:1,flicker:1,slow:4,gold:0}; // gaya teks -> shot
