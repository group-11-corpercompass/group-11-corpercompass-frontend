let currentTab='snapshot', currentState='oyo';

const DATA = {
  oyo:{
    name:'Oyo State', zone:'South-West Nigeria', emoji:'🥁',
    tagline:'Home of the ancient Oyo Empire. Predominantly Yoruba — cosmopolitan in the south, traditional in the north.',
    criticalAlert:null,
    stats:[{v:'33',l:'LGAs'},{v:'3',l:'Districts'},{v:'Yoruba',l:'Language'},{v:'~50/50',l:'Islam/Xty'}],
    snapRows:[
      {k:'Ethnic Group',v:'Yoruba (dominant) — Oyo-Yoruba, Ogbomoso-Yoruba, Oke-Ogun Yoruba. Hausa, Igbo & Nupe minorities in Ibadan (Sabo, Agbeni, Ojoo areas).'},
      {k:'Language',v:'English (official). Yoruba spoken across all age groups. Nigerian Pidgin widely used. Hausa in Northern border areas.'},
      {k:'Dressing',v:'Ibadan is cosmopolitan and accepts modern dress. Oke-Ogun (North) is conservative — covered clothing preferred especially for women.'},
      {k:'Greeting',v:'Yoruba place ENORMOUS value on greetings. Always greet elders first. Women kneel; men prostrate. Failure to greet is considered extremely rude.'},
      {k:'Gender Norms',v:'Mixed-gender socialising common in urban Ibadan. Rural/northern Oyo has conservative norms — women avoid prolonged interaction with unknown men.'},
    ],
    religion:[{n:'Islam',p:50},{n:'Christianity',p:48},{n:'Traditional',p:2}],
    relNote:'Oke-Ogun zone (North) has a stronger Muslim majority. Ibadan (South) is mixed. Traditional Aborisha religion practised in semi-rural areas.',
    phrases:[
      {n:'Ẹ káàárọ̀',e:'Good morning',u:'Essential daily morning greeting'},
      {n:'Ẹ káàbọ̀',e:'Welcome',u:'Welcoming any visitor or entering a home'},
      {n:'Bawo ni?',e:'How are you?',u:'Standard casual daily check-in'},
      {n:'E seun',e:'Thank you',u:'After receiving help, food, or kindness'},
      {n:'E jọ',e:'Please',u:'When making any polite request'},
      {n:'Ẹ má bínú',e:"I'm sorry",u:'Apology or passing through crowds'},
      {n:'Bẹẹ ni / Bẹẹ kọ',e:'Yes / No',u:'Quick confirmation or denial'},
      {n:'Ẹ káalẹ̀',e:'Good evening',u:'Evening greeting — use after 5pm'},
      {n:'Egbon / Aburo',e:'Older/Younger person',u:'Respectful address for age difference'},
    ],
    slangs:[
      {w:'Ẹ jẹ kí a lo',m:"Let us go — informal departure phrase"},
      {w:'Omo',m:'Friend / expression of surprise'},
      {w:'Egbon',m:'Older person, term of respect'},
      {w:'Na so e be',m:"That's how it is (Pidgin blend)"},
    ],
    taboos:[
      'Never disrespect the Oba (king) or royal figures — the Alaafin of Oyo and Olubadan of Ibadan are deeply revered.',
      'Do not whistle at night — considered spiritually bad and disrespectful in residential communities.',
      'Never use your left hand to give or receive items from elders. This is deeply impolite in Yoruba culture.',
      'Avoid touching or pointing at someone\'s head — it is considered sacred in Yoruba tradition.',
      'Never enter a shrine or sacred grove (igbo oro) without explicit permission from local elders.',
      'Do not compare Ibadan unfavourably to Lagos — Ibadanites are fiercely proud of their city and heritage.',
      'If you hear Egungun (masquerade) drumming, step inside a building immediately until it passes.',
    ],
    tips:[
      'Always greet before asking for anything — at offices, markets, homes. This single habit opens more doors than anything else.',
      'Wear your NYSC khaki conspicuously in uncertain areas. It grants significant social protection statewide.',
      'Women corpers posted to Oke-Ogun or Saki should carry a light scarf/head covering for mosque-adjacent communities.',
      'Learn who the Alaafin is before visiting Oyo Town. Knowing some Oyo Empire history creates instant goodwill with locals.',
      'In Saki, get an MTN SIM — best coverage in Oke-Ogun. Glo and Airtel drop significantly past Iseyin.',
      'For Ogbomoso: always withdraw cash before weekends — limited ATMs and no Bolt or Uber available.',
    ],
    food:[
      {n:'Amala + Ewedu + Gbegiri',d:'The iconic Ibadan/Oyo meal. Yam flour swallow with jute leaf & bean soup. ₦400–₦800 at bukas.'},
      {n:'Pounded Yam + Egusi',d:'Special occasion dish. Rich melon seed soup with pounded yam. Found across all restaurants.'},
      {n:'Suya',d:"Spiced grilled meat at Ibadan's night markets and around UI Gate. ₦500–₦1,500 per portion."},
      {n:'Eba + Soup',d:'Garri swallow with any local soup. Roadside bukas from ₦300–₦800. Most filling cheap meal.'},
      {n:'Rice + Stew',d:'Universal daily staple. Available everywhere. Night canteens near estates. ₦500–₦1,500.'},
      {n:'Bread + Egg',d:'Quick affordable breakfast from roadside vendors near campuses. ₦300–₦600.'},
    ],
    foodNote:'💡 Corper food budget: Eating 3 meals/day at bukas costs approx. ₦1,200–₦2,500/day. Monthly food spend ₦36,000–₦75,000. Buying from Bodija Market and cooking saves the most.',
    districts:[
      {n:'Oyo South (Ibadan)',d:'Most cosmopolitan zone. Ibadan is the largest city in West Africa by land area. Highly tolerant of diversity and multicultural neighbourhoods.',t:'Ibadan people are proud of their city. Complimenting it goes a long way. Avoid comparing to Lagos.'},
      {n:'Oyo Central (Oyo Town)',d:"Home of the ancient Oyo Empire and the Alaafin's palace. Deeply traditional Yoruba values with strong monarchical reverence.",t:"Always show respect near the Alaafin's palace area. Community events revolve around traditional festivals."},
      {n:'Oyo North (Ogbomoso/Oke-Ogun)',d:"Ogbomoso is Nigeria's 5th largest city. Oke-Ogun is semi-rural and agrarian with strong Islamic influence in Saki and border areas.",t:'Learn basic Hausa/Yoruba words if posted to Saki. Women should carry a scarf. Always greet the bale (village head).'},
    ],
    testimonials:[
      {b:'Oyo South — Ibadan',q:'The traffic was shocking — getting from Challenge to Dugbe can take 40 minutes on a bad day. Ibadan is far bigger than it looks on a map. Learn the bus routes early: Iwo Road, Ojoo, Challenge, and Dugbe are your main hubs.',n:'Anonymous Corper',r:'Secondary School, Ibadan North'},
      {b:'Oyo North — Ogbomoso',q:'How friendly and warm Ogbomoso people are — absolute strangers invited me for meals. Everything was cheaper than expected. There\'s no Bolt here, so plan your movements around keke timetables. Always withdraw cash before weekends.',n:'Anonymous Corper',r:'LAUTECH, Ogbomoso'},
      {b:'Oyo Central — Oyo Town',q:"I wore revealing shorts to a community meeting early in my service year and received very cold responses from the elders. Dress modestly in Oyo town, especially for events involving traditional institutions or the Alaafin.",n:'Anonymous Corper',r:'LGA Secretariat, Atiba LGA'},
      {b:'Oyo North — Saki',q:"As a female corper from the East, I wore a scarf when visiting the market on Fridays — it was noticed and deeply appreciated. I also learned to say 'E káàárọ̀' and locals loved it. Never decline a sincere invitation to eat in Oke-Ogun.",n:'Anonymous Corper',r:'Senior Secondary School, Saki West'},
    ],
  },
  enugu:{
    name:'Enugu State', zone:'South-East Nigeria', emoji:'⛏️',
    tagline:'The Coal City State. Predominantly Igbo, deeply Christian, warm hospitality, and vibrant communal identity. Home to UNN and ESUT.',
    criticalAlert:null,
    stats:[{v:'17',l:'LGAs'},{v:'Igbo',l:'Language'},{v:'~90%',l:'Christian'},{v:'Coal City',l:'Nickname'}],
    snapRows:[
      {k:'Ethnic Group',v:'Igbo (~95% of population). Small Igala and Idoma minority in border LGAs. Very cosmopolitan in Enugu city — corpers from all states welcomed.'},
      {k:'Language',v:'English (offices & schools). Igbo (primary daily language). Nigerian Pidgin widely used in markets and informal settings.'},
      {k:'Cultural Values',v:"Respect, communal living, and hospitality to visitors. Elders are highly respected — always greet first. Address as 'sir' or 'ma'."},
      {k:'Communication',v:'Igbo people speak directly — this is culture, not rudeness. Locals who speak loudly in markets are expressing energy, not aggression.'},
      {k:'Sunday Culture',v:'Very strong — many businesses open late after church services. Services often start as early as 7am. Plan errands for Saturday or post-midday Sunday.'},
    ],
    religion:[{n:'Christianity',p:90},{n:'Islam',p:7},{n:'Traditional',p:3}],
    relNote:"Sunday culture is deeply embedded in social life. Joining a fellowship group (RCCF, NCCF, Winners, MFM) helps with accommodation, networking, and community. Muslim corpers: MCAN Lodge available at Uwani, Enugu (07063502627).",
    phrases:[
      {n:'Ndewo / Nnọọ',e:'Hello / Welcome',u:'Greeting anyone when entering a space'},
      {n:'Kedu?',e:'How are you?',u:"Standard casual greeting anywhere"},
      {n:'Ọ dị mma',e:'I am fine / It is fine',u:"Response to 'Kedu?'"},
      {n:'Ututu oma',e:'Good morning',u:'Morning greeting to anyone'},
      {n:'Anyasị oma',e:'Good evening',u:'Evening greeting after 5pm'},
      {n:'Daalu / Imeela',e:'Thank you (casual/formal)',u:'After receiving help or kindness'},
      {n:'Biko',e:'Please',u:'Making polite requests'},
      {n:'Ndo',e:'Sorry / Excuse me',u:'Apology or passing through'},
      {n:'Ego ole ka nke a bụ?',e:'How much is this?',u:'Shopping and market bargaining'},
    ],
    slangs:[
      {w:'Ee / Mba',m:'Yes / No — direct confirmation or denial'},
      {w:'How far?',m:'How are you? (Pidgin — very casual)'},
      {w:'No wahala',m:'No problem — reassuring response'},
      {w:'Nna / Nne',m:'Father/Mother — affectionate address for anyone older'},
    ],
    taboos:[
      "Rudeness to elders or ignoring greetings is a deep cultural violation. Always greet first; speak gently; use 'sir' and 'ma'.",
      'Eating with the left hand is a cultural taboo in traditional settings. Use your right hand or both hands when receiving food.',
      'Stepping over a seated or lying person is a spiritual offence in Igbo culture. Always walk around them.',
      'Refusing kola nut when offered is deeply offensive. Accept with both hands graciously — you need not eat it.',
      "Commenting on land disputes between families — land is sacred and emotionally charged in Igbo communities. Never take sides.",
      'Photography at funerals or ceremonies without explicit permission is deeply disrespectful. Always ask first.',
      'Whistling at night near homes — believed to attract bad spirits. Taken seriously in residential areas.',
    ],
    tips:[
      'Joining a fellowship group (RCCF, NCCF, Winners, MFM) helps with accommodation, networking, and community in Enugu.',
      'Abakpa Nike is where 50–60% of Enugu corpers choose to live — affordable, good transport, active community.',
      'Always greet every person present when entering a room, not just your primary contact. This is non-negotiable.',
      'Dress in Isi-Agu fabric (men) or George wrapper (women) at cultural events — participating builds deep community respect.',
      'MTN has the widest coverage. Starlink internet is available in Enugu city for fast, reliable connectivity.',
      'Plan Sunday errands for Saturday or after midday — many businesses open late after church services end.',
    ],
    food:[
      {n:'Ofe Onugbu (Bitter Leaf Soup)',d:'Most iconic Enugu dish. Served with pounded yam or eba. Found at all local bukas and mama-put stalls.'},
      {n:'Ofe Nsala (White Soup)',d:'Light peppery soup popular with catfish or white meat. Common in local restaurants across the city.'},
      {n:'Abacha (African Salad)',d:'Shredded dried cassava with palm oil, onions, ugba. Street food staple from market stalls.'},
      {n:'Nkwobi',d:'Spiced cow foot. Common at social gatherings. Try Open Sharaton on Chime Avenue, New Haven.'},
      {n:'Oha Soup',d:'Made from oha leaves — very popular traditional Enugu soup. Available at Ofu Obi African Restaurant.'},
      {n:'Pepper Soup (catfish/goat)',d:'Spicy broth. Very popular at social gatherings and bars. Try Open Sharaton or local chop bars.'},
    ],
    foodNote:'⚠️ Dietary note: Pork is widely consumed in Enugu. If you have dietary restrictions, inform your host family and PPA early in your service year.',
    districts:[
      {n:'Enugu North (City Centre)',d:'State ministries, private hospitals, corporate offices, NGOs. Most developed zone. GRA and Independence Layout are premium areas.',t:'Very cosmopolitan — corpers from all regions feel welcome. Abakpa Nike (50–60% of corpers live here) is the top choice for housing.'},
      {n:'Nsukka & UNN Axis',d:'Home of the University of Nigeria, Nsukka. Education and research hub. Active student environment on Odenigbo Road.',t:'RCCF, NCCF, and Winners lodges are active and recommended. Ogige Market serves most daily needs.'},
      {n:'Udi / 9th Mile / Rural LGAs',d:'Site of NYSC orientation camp. Nigerian Breweries PPA at 9th Mile. Semi-rural character with lower costs.',t:'Accommodation is significantly cheaper outside Enugu city. De Castle Hotel at 9th Mile is a good temporary option.'},
    ],
    testimonials:[
      {b:'Enugu North',q:"My first day at PPA I walked into the office and greeted a colleague without greeting the others seated around the table. I was instantly corrected — always greet everyone present. Greetings are not optional in Enugu. They are the price of entry.",n:'Anonymous Corper',r:'Government Office, Enugu North'},
      {b:'Enugu East — Abakpa',q:"I once crossed my legs while sitting across from an elderly landlord during rent discussions — he paused the conversation to point it out. I didn't realise how important body posture was. Since then I started carrying myself more mindfully around elders.",n:'Anonymous Corper',r:'Private School, Abakpa Nike'},
      {b:'Nsukka',q:"When I arrived at my PPA in Nsukka, a colleague explained the cultural norms clearly. Since then I built 12 strong relationships with community members. Cultural awareness here is everything — it opens every door you need opened.",n:'Anonymous Corper',r:'Research Institute, Nsukka'},
      {b:'Enugu South',q:"You must always speak to people first before asking for anything — even in a shop. The warmth you receive in return when you greet first is extraordinary. This single habit made my entire service year a positive experience in Enugu.",n:'Anonymous Corper',r:'Health Centre, Uwani'},
    ],
  },
  kaduna:{
    name:'Kaduna State', zone:'North-West Nigeria', emoji:'🌾',
    tagline:"One of Nigeria's most ethnically and religiously diverse states. Muslim north, Christian south. ABU Zaria is a landmark institution. Hausa is your master key.",
    criticalAlert:"In Kaduna State, religion determines neighbourhood safety. Christians should live in Christian-dominant areas; Muslims in Muslim-dominant areas. This is the most important safety rule in this guide. Always follow real-time guidance from your LGA corpers WhatsApp group.",
    stats:[{v:'7',l:'Key LGAs'},{v:'Hausa',l:'Lingua Franca'},{v:'Sannu',l:'#1 Word'},{v:'10pm',l:'Night Curfew'}],
    snapRows:[
      {k:'Ethnic Groups',v:'Hausa-Fulani (North) · Gbagyi/Gwari · Bajju/Kaje/Atyap (South) · Adara (Kajuru/Kachia). Very ethnically diverse state.'},
      {k:'Lingua Franca',v:'Hausa — used across ALL of Kaduna State by both Muslim and Christian communities daily. The most practical integration tool you have.'},
      {k:'North Character',v:"Traditional Islamic customs. Strict gender norms. Friday Juma'at prayers 12:30–2pm businesses close. Conservative dress enforced informally."},
      {k:'South Character',v:'Deep evangelical Christian tradition. Church culture strong. Southern Kaduna communities have indigenous language groups alongside Hausa.'},
      {k:'Checkpoint',v:"Say 'Sannu' calmly before anything else. Keep hands visible. Explain slowly. Show NYSC ID. Your most important safety behaviour."},
    ],
    religion:[{n:'Zaria/Kd. North (Islam)',p:90},{n:'Jema\'a/South (Xty)',p:85},{n:'Kd. South (Mixed)',p:55}],
    relNote:"The state is religiously divided by geography. Zaria & Kaduna North are ~90% Muslim. Jema'a & Southern Kaduna are predominantly Christian. Kaduna South is mixed. Equal visible respect to both faiths at all times is non-negotiable.",
    phrases:[
      {n:'Sannu',e:'Hello / Sorry / Thank you (universal)',u:'Use it everywhere — greeting, apology, checkpoint opener.'},
      {n:'Ina kwana?',e:'Good morning (how did you sleep?)',u:'Morning greeting to anyone'},
      {n:'Ina wuni?',e:'Good afternoon',u:'Afternoon greeting'},
      {n:'Lafiya? / Lafiya lau',e:"How are you? / I'm fine",u:'Checking wellbeing and standard response'},
      {n:'Alhamdulillah',e:'Praise be to God',u:'When good things happen — deeply appreciated'},
      {n:'Na gode',e:'Thank you (formal)',u:'Expressing formal gratitude'},
      {n:'Sannu da aiki',e:'Well done / Greetings with your work',u:'When someone is working hard — very appreciated'},
      {n:'Ba wahala',e:'No problem',u:'Reassuring response to any concern'},
      {n:'Nawa ne?',e:'How much is it?',u:'Market bargaining — essential'},
    ],
    slangs:[
      {w:'Kai!',m:'Expression of surprise — fits any situation casually'},
      {w:'Allah ya kare ku',m:'May God protect you — parting blessing, deeply appreciated'},
      {w:'Ina zuwa',m:'Welcome (to someone arriving)'},
      {w:'Yaya aiki?',m:'How is work? — greeting colleagues at your PPA'},
    ],
    taboos:[
      'Eating or drinking publicly during Ramadan in Muslim communities causes serious community offence. Eat indoors only during daylight hours.',
      'Alcohol visible in public in northern Kaduna — never carry or drink alcohol visibly in Zaria or Kaduna North public areas.',
      "Not greeting at security checkpoints — reaching into bags or looking nervous without saying 'Sannu' first is a safety risk.",
      'Public displays of affection (PDA) — zero PDA anywhere in Kaduna, in both Muslim and Christian areas.',
      'Initiating a handshake with Muslim women — wait to see if she extends her hand first. Never initiate.',
      'Disrespecting religion — expressing preference for one faith over another can escalate very quickly in Kaduna.',
      "Scheduling anything from 12:30–2pm on Fridays in Zaria/Kaduna North — Juma'at prayer time; all activities stop.",
    ],
    tips:[
      'Join your LGA corpers WhatsApp group on Day 1 — the most important action for safety and real-time information in Kaduna.',
      "At any police/security checkpoint: say 'Sannu' calmly before anything. Hands visible. Explain slowly. Show NYSC ID.",
      'Contact your denomination\'s fellowship group (RCCF, NCCF, ECWA, Winners) on Day 1 for accommodation referrals and security networks.',
      'Get an MTN SIM first — widest coverage across all Kaduna LGAs.',
      "Learn 5 Hausa phrases before leaving camp. Start with 'Sannu'. Locals are genuinely impressed and welcoming when you try.",
      "10pm is the firm movement curfew — even on weekends, even in 'safe' areas, even with friends.",
    ],
    food:[
      {n:'Tuwo Shinkafa',d:'Thick rice swallow — the most popular Kaduna staple. Eaten with soups. Available at all local bukas statewide.'},
      {n:'Miyan Kuka (Baobab Leaf Soup)',d:'The most iconic Hausa soup. Thin, dark, distinctive earthy flavour. Common in Kaduna North and Zaria.'},
      {n:'Suya',d:"Kaduna's most popular street food. Spiced beef/chicken skewers at evening roadside stalls. ₦300–₦700/stick."},
      {n:'Kilishi',d:"Kaduna's most famous export — dried spiced beef jerky. Buy at Kasuwa Market. Great as a gift when travelling."},
      {n:'Dan Wake',d:'Boiled bean cake with onion and oil. Popular filling street food from morning vendors near markets.'},
      {n:'Masa (Rice Cake)',d:'Fried rice cakes — popular breakfast item. Found at most morning street stalls everywhere in Kaduna.'},
    ],
    foodNote:'⚠️ Pork availability: Pork is unavailable in northern Kaduna. Available at specific spots in southern Kaduna. Confirm on arrival in your LGA.',
    districts:[
      {n:'Kaduna North / Zaria',d:'Islam dominant (~90%). ABU campus is most cosmopolitan. Strict Islamic norms. Conservative dress enforced informally across both LGAs.',t:'Best corper zones: Ungwan Rimi, Kawo (Kaduna North) · Samaru, Sabon Gari (Zaria). ABU campus is safest.'},
      {n:'Kaduna South',d:'Mixed (Christian-leaning). More relaxed than north but still conservative. Both faiths respected side by side in most areas.',t:'Best zones: Barnawa, Narayi, Gonin Gora, Sabon Tasha. Match neighbourhood to your faith — ask fellow corpers.'},
      {n:"Jema'a / Southern Kaduna",d:"Christianity dominant. Kafanchan is the main town — stable and well-served. Deep evangelical church culture throughout.",t:'Follow church community guidance from Day 1. Kafanchan town centre is most accessible for newly posted corpers.'},
    ],
    testimonials:[
      {b:'Kaduna North',q:"I trained myself to say 'Sannu' instinctively before arriving. At the first checkpoint on my way to my PPA, the officer lit up the moment I said it with a smile. That one word opened more doors for me this year than anything else could have.",n:'Anonymous Corper',r:'Ministry Office, Kaduna North'},
      {b:'Zaria',q:"During Ramadan, I almost ate in the office one afternoon — a colleague quietly told me to put the food away. I understood later how serious it was. Respect the community calendar of wherever you're posted. It costs nothing and gains you everything.",n:'Anonymous Corper',r:'ABU-Affiliated School, Samaru'},
      {b:'Kaduna South',q:"I was surprised to find colleagues from both Muslim and Christian backgrounds celebrating each other's religious events. The cosmopolitan mix in Barnawa was something I completely didn't expect at all.",n:'Anonymous Corper',r:'Private Company, Barnawa'},
      {b:"Jema'a",q:"I was from Enugu and was scared going to Kafanchan. But the community was incredibly warm. I joined an ECWA fellowship group and they helped me find a room and introduced me to key people. Don't go it alone — the fellowship community is your safety net.",n:'Anonymous Corper',r:'Government School, Kafanchan'},
    ],
  },
};

function card(icon,title,body){return`<div class="card"><div class="card-title"><div class="card-title-icon">${icon}</div>${title}</div>${body}</div>`;}
function infoRows(rows){return rows.map(r=>`<div class="info-row"><div class="info-key">${r.k}</div><div class="info-val">${r.v}</div></div>`).join('');}
function listItems(arr,cls){return arr.map(t=>`<div class="list-item"><div class="${cls}"></div><span>${t}</span></div>`).join('');}

function renderSnapshot(s,d){
  return `
    ${d.criticalAlert?`<div class="alert-red"><strong>⚠️ Critical Safety Information — Read First</strong>${d.criticalAlert}</div>`:''}
    <div class="snapshot-hero">
      <div class="snapshot-hero-bg"></div>
      <div class="snapshot-hero-content">
        <div class="hero-eyebrow">🗺️ ${d.zone}</div>
        <h1>Cultural Snapshot — ${d.name}</h1>
        <p>${d.tagline}</p>
      </div>
    </div>
    <div class="stats-row">${d.stats.map(st=>`<div class="stat-box"><div class="stat-val">${st.v}</div><div class="stat-label">${st.l}</div></div>`).join('')}</div>
    <div class="section-label">People & Identity</div>
    <div class="cols-2">
      ${card('👥','Cultural Overview',infoRows(d.snapRows))}
      ${card('🕌',`Religion in ${d.name}`,
        d.religion.map(r=>`<div class="rel-row"><div class="rel-name">${r.n}</div><div class="rel-bar"><div class="rel-fill" style="width:${r.p}%"></div></div><div class="rel-pct">${r.p}%</div></div>`).join('')+
        `<div style="margin-top:14px;padding:12px;background:var(--green-pale);border-radius:10px;font-size:12.5px;color:var(--ink-mid);line-height:1.55;">${d.relNote}</div>`
      )}
    </div>
    <div class="section-label">By District / Zone</div>
    <div class="district-grid">${d.districts.map(dc=>`<div class="dcard"><div class="dcard-name">${dc.n}</div><div class="dcard-desc">${dc.d}</div><div class="dcard-tip">🗝️ ${dc.t}</div></div>`).join('')}</div>
    <div class="section-label">Taboos & Integration Tips</div>
    <div class="cols-2">
      ${card('⚠️','What to Avoid',listItems(d.taboos,'dot-red'))}
      ${card('✅','Integration Tips',listItems(d.tips,'dot-green'))}
    </div>`;
}

function renderLanguage(s,d){
  return `
    <div class="snapshot-hero" style="height:220px;"><div class="snapshot-hero-bg"></div>
      <div class="snapshot-hero-content"><div class="hero-eyebrow">🗣️ Language Guide</div><h1>Language Basics — ${d.name}</h1></div></div>
    <div class="section-label">Essential Phrases</div>
    <div class="phrase-grid">${d.phrases.map(p=>`<div class="phrase-card"><div class="phrase-native">${p.n}</div><div class="phrase-english">${p.e}</div><div class="phrase-use">${p.u}</div></div>`).join('')}</div>
    <div class="section-label">Common Slangs & Expressions</div>
    <div class="cols-1">${card('💬','Everyday Expressions',d.slangs.map(sl=>`<div class="slang-row"><div class="slang-word">${sl.w}</div><div class="slang-meaning">${sl.m}</div></div>`).join(''))}</div>
    <div class="cols-1"><div class="card" style="background:var(--green-pale);border-color:var(--green-pale2);">
      <div class="card-title"><div class="card-title-icon">💡</div>Language Integration Tip</div>
      <p style="font-size:14px;color:var(--ink-mid);line-height:1.6;">Even a few words in the local language creates <strong>instant goodwill</strong> with residents. Making the effort signals respect for the community.${s==='kaduna'?' <strong>Sannu</strong> alone will get you through checkpoints, market negotiations, greetings, and workplace introductions in Kaduna. Master it before you leave camp.':''}</p>
    </div></div>`;
}

function renderTips(s,d){
  const dressAlert=s==='kaduna'?`<div class="alert-warn"><span>👗</span><div><strong style="display:block;margin-bottom:4px;">Dressing Advisory — Zaria & Kaduna North</strong>Female corpers in Zaria and Kaduna North: covered arms and legs are non-negotiable. Revealing clothing will attract verbal harassment. A hijab or head covering is strongly recommended from Day 1.</div></div>`:'';
  return `
    <div class="tips-hero">
      <div style="position:relative;z-index:1;">
        <div class="hero-eyebrow">💡 Practical Guide</div>
        <h1 style="font-size:28px;font-weight:800;color:white;letter-spacing:-.5px;margin-bottom:8px;">Practical Communication Tips — ${d.name}</h1>
        <p style="font-size:14px;color:rgba(255,255,255,.7);max-width:480px;">How to speak and behave respectfully when interacting with people in ${d.name}.</p>
      </div>
    </div>
    ${dressAlert}
    <div class="section-label">How to Interact Respectfully</div>
    <div class="interact-grid">
      <div class="interact-card"><div class="interact-title"><span class="badge-do">DO</span> Recommended Behaviours</div>${listItems(d.tips,'dot-green')}</div>
      <div class="interact-card"><div class="interact-title"><span class="badge-dont">DON'T</span> What to Avoid</div>${listItems(d.taboos,'dot-red')}</div>
    </div>
    <div class="section-label">Workplace & Social Etiquette</div>
    <div class="cols-1">${card('🏢','Key Etiquette Rules',`
      <div class="info-row"><div class="info-key">Greeting</div><div class="info-val">Always greet before asking for anything — in any setting, every single time. This is the single most important social currency in ${d.name}.</div></div>
      <div class="info-row"><div class="info-key">Elders</div><div class="info-val">Address people older than you as 'sir' or 'ma' — even if the age gap is small. Greeting elders first in any room is expected and non-optional.</div></div>
      <div class="info-row"><div class="info-key">Dressing</div><div class="info-val">${s==='kaduna'?"Covered arms and legs everywhere. Non-negotiable in Zaria and Kaduna North. Modest in Kaduna South and Jema'a.":s==='enugu'?'Smart professional at PPA. Isi-Agu/George at cultural events. Modest but modern is acceptable in Enugu city.':'Ibadan accepts modern dress. Oke-Ogun/Saki: conservative clothing. NYSC khaki provides social protection everywhere.'}</div></div>
      <div class="info-row"><div class="info-key">Food Offers</div><div class="info-val">Never refuse food or drink offered sincerely by a host. Refusal is considered deeply rude across all communities.</div></div>
      <div class="info-row"><div class="info-key">Photography</div><div class="info-val">Always ask before photographing people, religious sites, or cultural ceremonies. Never photograph without explicit permission.</div></div>
    `)}</div>`;
}

function renderFood(s,d){
  return `
    <div class="snapshot-hero" style="height:220px;"><div class="snapshot-hero-bg" style="background:linear-gradient(135deg,rgba(26,107,58,.88),rgba(0,0,0,.6))"></div>
      <div class="snapshot-hero-content"><div class="hero-eyebrow">🍲 Food Culture</div><h1>Local Food Guide — ${d.name}</h1></div></div>
    <div class="section-label">Must-Know Dishes</div>
    <div class="food-grid">${d.food.map(f=>`<div class="food-card"><div class="food-name">${f.n}</div><div class="food-desc">${f.d}</div></div>`).join('')}</div>
    <div class="alert-warn" style="border-left-color:var(--green);background:var(--green-pale);border-color:var(--green-pale2);color:var(--ink-mid);"><span>💡</span><div>${d.foodNote}</div></div>
    <div class="section-label">Where to Eat</div>
    <div class="cols-1">${card('🍽️','Eating Options for Corpers',`
      <div class="info-row"><div class="info-key">Local Bukas</div><div class="info-val">Cheapest and most authentic option. Roadside mama-put spots near schools, markets, and bus stops. ₦500–₦1,500 per plate.</div></div>
      <div class="info-row"><div class="info-key">Fast Food</div><div class="info-val">${s==='oyo'?'Chicken Republic (Dugbe, UI Road, Ring Road), Mr Biggs (Dugbe & Bodija), Item 7 (Oluyole). ₦1,500–₦4,000/meal.':s==='enugu'?'Kilimanjaro (Polo Park Mall), Genesis (Rangers Avenue), Crunchies (Rangers Avenue), Open Sharaton (Chime Avenue). ₦2,500–₦6,000.':'Chicken Republic, Kilimanjaro, Foodies Arena, 911 Fast Food, Disney Chicken — all in Kaduna city. ₦1,500–₦4,500.'}</div></div>
      <div class="info-row"><div class="info-key">Budget Tip</div><div class="info-val">Buying staples from local markets and cooking at home saves the most money. ${s==='oyo'?'Bodija Market (Ibadan) has the cheapest food prices.':s==='enugu'?'Ogbete Main Market has the cheapest bulk prices in Enugu.':'Kaduna Central Market (Kasuwa) — all buses stop here; buy everything.'}</div></div>
      <div class="info-row"><div class="info-key">Night Food</div><div class="info-val">${s==='oyo'?'Suya spots at night markets, UI Gate area, Ring Road Ibadan are very popular.':s==='enugu'?'Roadside suya evening stalls across the city. BE-Love Shawarma on Okpara Avenue.':'Roadside suya stalls across all LGAs in the evening. ₦300–₦700/stick.'}</div></div>
    `)}</div>`;
}

function renderTestimonials(s,d){
  const imgs=['🧑🏿','👩🏾','🧑🏾','👩🏿'];
  return `
    <div class="snapshot-hero" style="height:220px;"><div class="snapshot-hero-bg" style="background:linear-gradient(135deg,rgba(10,40,25,.9),rgba(26,107,58,.7))"></div>
      <div class="snapshot-hero-content"><div class="hero-eyebrow">💬 Real Experiences</div><h1>Corper Experiences — ${d.name}</h1><p>From corps members who served in this state — what surprised them, what helped them, and what they wish they knew before arriving.</p></div></div>
    <div class="section-label">What Corps Members Say</div>
    <div class="testimonial-grid">${d.testimonials.map((t,i)=>`
      <div class="tcard">
        <div class="tcard-img" style="font-size:48px;">${imgs[i%4]}<div class="tcard-img-label">NYSC CORPS MEMBER</div></div>
        <div class="tcard-body">
          <div class="tcard-badge">${t.b}</div>
          <div class="tcard-quote">${t.q}</div>
          <div class="tcard-author"><div class="tcard-avatar">A</div><div><div class="tcard-name">${t.n}</div><div class="tcard-role">${t.r}</div></div></div>
        </div>
      </div>`).join('')}</div>
    <div class="cols-1"><div class="card" style="background:var(--green-pale);border-color:var(--green-pale2);text-align:center;padding:32px;">
      <div style="font-size:28px;margin-bottom:12px;">📣</div>
      <div style="font-size:16px;font-weight:700;color:var(--ink);margin-bottom:8px;">Have a story to share?</div>
      <div style="font-size:14px;color:var(--muted);margin-bottom:20px;max-width:400px;margin-left:auto;margin-right:auto;">Your experience can help the next corper arriving in ${d.name}. Share your testimony with the CorperCompass team.</div>
      <button class="btn-primary">Submit Your Experience</button>
    </div></div>`;
}

function showLanding(){
  document.getElementById('landing').style.display='block';
  document.getElementById('culturePage').style.display='none';
}
function showCultureTab(tab,state){
  document.getElementById('landing').style.display='none';
  document.getElementById('culturePage').style.display='block';
  currentTab=tab; currentState=state; renderPage();
}
function switchTab(tab){ currentTab=tab; renderPage(); }
function switchState(state){ currentState=state; renderPage(); }

function renderPage(){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  const te=document.getElementById('tab-'+currentTab); if(te) te.classList.add('active');
  document.querySelectorAll('.state-tab').forEach(b=>b.classList.remove('active'));
  document.getElementById('stab-'+currentState).classList.add('active');
  const d=DATA[currentState];
  let html=`<div class="breadcrumb"><a onclick="showLanding()">Home</a><span class="breadcrumb-sep">›</span>Culture & Language<span class="breadcrumb-sep">›</span>${d.name}</div>`;
  if(currentTab==='snapshot') html+=renderSnapshot(currentState,d);
  else if(currentTab==='language') html+=renderLanguage(currentState,d);
  else if(currentTab==='tips') html+=renderTips(currentState,d);
  else if(currentTab==='food') html+=renderFood(currentState,d);
  else if(currentTab==='testimonials') html+=renderTestimonials(currentState,d);
  const el=document.getElementById('tabContent');
  el.innerHTML=html;
  el.style.animation='none'; el.offsetHeight; el.style.animation='';
  window.scrollTo({top:0,behavior:'smooth'});
}