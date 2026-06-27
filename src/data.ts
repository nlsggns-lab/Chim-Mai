import { Recipe } from "./types";

export interface RawIngredient {
  item: { en: string; th: string };
  amount: { en: string; th: string };
  note?: { en: string; th: string };
}

export interface RawStep {
  number: number;
  instruction: { en: string; th: string };
  timer?: {
    duration: number;
    label: { en: string; th: string };
  };
  tip?: { en: string; th: string };
}

export interface RawRecipe {
  id: string;
  dormFriendly?: boolean;
  title: { en: string; th: string };
  subtitle: { en: string; th: string };
  image: string;
  origin: {
    cuisine: { en: string; th: string };
    region: { en: string; th: string };
    source: { en: string; th: string };
    story: { en: string; th: string };
    flag: string;
  };
  difficulty: "Beginner" | "Intermediate" | "Chef";
  prepTime: { en: string; th: string };
  cookTime: { en: string; th: string };
  servings: number;
  estimatedCost?: { amount: number; currency: string; tier: "green" | "yellow" | "orange" };
  equipment?: string[];
  nutrition: { calories: number; protein: string; carbs: string; fat: string };
  ingredients: RawIngredient[];
  steps: RawStep[];
  communityMadeCount: number;
  todayViews: number;
  rating: number;
  tags: { en: string[]; th: string[] };
}

export const RAW_RECIPES: RawRecipe[] = [
  {
    id: "tonkotsu-ramen",
    title: { en: "Tonkotsu Ramen", th: "ราเม็งทงคตสึ" },
    subtitle: { en: "Rich & Creamy 12-Hour Pork Bone Broth", th: "ซุปกระดูกหมูเข้มข้นเคี่ยวนาน 12 ชั่วโมง" },
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800",
    origin: {
      cuisine: { en: "Japanese", th: "ญี่ปุ่น" },
      region: { en: "Hakata, Fukuoka", th: "ฮากาตะ, ฟุกุโอกะ" },
      source: { en: "Ichiran signature style", th: "สไตล์ราเม็งข้อสอบอิจิรัน" },
      story: {
        en: "Tonkotsu ramen originated in Fukuoka in 1937 when a street vendor accidentally left pork bones boiling overnight, creating the signature milky-white, gelatinous broth that defines Hakata-style ramen.",
        th: "ราเม็งทงคตสึถือกำเนิดขึ้นในจังหวัดฟุกุโอกะเมื่อปี ค.ศ. 1937 จากการที่พ่อค้าหาบเร่บังเอิญต้มกระดูกหมูทิ้งไว้ข้ามคืน จนทำให้ได้น้ำซุปกระดูกสีขาวขุ่นอันเปี่ยมไปด้วยคอลลาเจนซึ่งกลายเป็นเอกลักษณ์ของราเม็งสไตล์ฮากาตะ"
      },
      flag: "🇯🇵"
    },
    difficulty: "Chef",
    prepTime: { en: "30 min", th: "30 นาที" },
    cookTime: { en: "12 hours", th: "12 ชั่วโมง" },
    servings: 4,
    nutrition: { calories: 820, protein: "38g", carbs: "78g", fat: "32g" },
    ingredients: [
      {
        item: { en: "Pork femur bones", th: "กระดูกต้นขาหมู" },
        amount: { en: "2 kg", th: "2 กิโลกรัม" },
        note: { en: "Cleaned and rinsed", th: "ล้างและทำความสะอาดอย่างดี" }
      },
      {
        item: { en: "Chashu pork belly", th: "หมูสามชั้นชาชู" },
        amount: { en: "500g", th: "500 กรัม" },
        note: { en: "Rolled and tied with twine", th: "ม้วนและมัดด้วยเชือกทำอาหาร" }
      },
      {
        item: { en: "Ramen noodles", th: "เส้นราเม็ง" },
        amount: { en: "4 portions", th: "4 ก้อน" },
        note: { en: "Fresh alkaline thin noodles", th: "เส้นสดสไตล์ฮากาตะแบบเส้นเล็ก" }
      },
      {
        item: { en: "Soy sauce", th: "ซีอิ๊วญี่ปุ่น (โชยุ)" },
        amount: { en: "100ml", th: "100 มล." },
        note: { en: "For the tare (seasoning)", th: "สำหรับทำซอสทาเระ" }
      },
      {
        item: { en: "Mirin", th: "มิริน" },
        amount: { en: "50ml", th: "50 มล." },
        note: { en: "For the tare and eggs", th: "สำหรับทาเระและไข่ดอง" }
      },
      {
        item: { en: "Garlic", th: "กระเทียม" },
        amount: { en: "6 cloves", th: "6 กลีบ" },
        note: { en: "Crushed", th: "บุบพอแตก" }
      }
    ],
    steps: [
      {
        number: 1,
        instruction: {
          en: "Soak pork femur bones in cold water for 2 hours to extract blood. Drain and rinse thoroughly.",
          th: "แช่กระดูกต้นขาหมูในน้ำเย็นจัดเป็นเวลา 2 ชั่วโมงเพื่อดึงลิ่มเลือดและสิ่งสกปรกออก จากนั้นเทน้ำทิ้งและล้างให้สะอาด"
        },
        timer: { duration: 7200, label: { en: "Soak pork bones", th: "แช่กระดูกหมู" } },
        tip: {
          en: "This is crucial for a clean, creamy, milky broth without dark impurities.",
          th: "ขั้นตอนนี้สำคัญมากเพื่อให้ซุปสีขาวน้ำนมสวยงาม ไม่มีตะกอนดำ"
        }
      },
      {
        number: 2,
        instruction: {
          en: "Place bones in a large pot, cover with fresh water, and bring to a rolling boil. Boil for 15 minutes, then drain and vigorously wash each bone to remove coagulated marrow.",
          th: "ใส่กระดูกลงในหม้อ เติมน้ำให้ท่วม ต้มจนเดือดพล่าน 15 นาที จากนั้นเทน้ำทิ้ง นำกระดูกแต่ละชิ้นมาล้างขัดคราบเลือดดำๆ ออกให้เกลี้ยง"
        },
        timer: { duration: 900, label: { en: "Blanch bones", th: "ต้มล้างสิ่งสกปรก" } },
        tip: {
          en: "Vigorously scrub off any dark residue from the bones. It prevents funky smells!",
          th: "ขัดคราบดำๆ ตามซอกกระดูกออกให้หมด จะช่วยป้องกันกลิ่นสาบ!"
        }
      },
      {
        number: 3,
        instruction: {
          en: "Return clean bones to the pot, add garlic and ginger. Cover with 5 liters of water. Keep it boiling continuously with the lid on for 10 hours. Add water as necessary.",
          th: "ใส่กระดูกสะอาดกลับลงหม้อ เติมกระเทียมและขิง เติมน้ำ 5 ลิตร ปิดฝาแล้วต้มให้เดือดพล่านต่อเนื่องเป็นเวลา 10 ชั่วโมง คอยเติมน้ำประคองระดับไว้"
        },
        timer: { duration: 36000, label: { en: "Simmer broth", th: "เคี่ยวน้ำซุปยาว" } },
        tip: {
          en: "A rolling boil is essential to emulsify the fat and marrow into the water, producing the milky look.",
          th: "การต้มเดือดพล่านต่อเนื่องเป็นกุญแจสำคัญที่ทำให้ไขมันและไขกระดูกผสมผสานกับน้ำจนกลายเป็นสีขาวนวล"
        }
      }
    ],
    communityMadeCount: 147,
    todayViews: 1243,
    rating: 4.9,
    tags: {
      en: ["Japanese", "Noodles", "Warm", "Pork", "Chef"],
      th: ["ญี่ปุ่น", "ก๋วยเตี๋ยว", "อบอุ่น", "หมู", "เชฟยอดฝีมือ"]
    }
  },
  {
    id: "pad-thai",
    title: { en: "Pad Thai", th: "ผัดไทยกุ้งสด" },
    subtitle: { en: "Street-Style Sweet & Sour Stir-Fried Noodles", th: "เส้นจันท์ผัดไทยรสกลมกล่อมสามรสสไตล์สตรีทฟู้ด" },
    image: "https://images.unsplash.com/photo-1626804475315-9644b37a2fe4?q=80&w=800",
    origin: {
      cuisine: { en: "Thai", th: "ไทย" },
      region: { en: "Bangkok Street-food", th: "สตรีทฟู้ดกรุงเทพฯ" },
      source: { en: "Adapted from traditional Thip Samai recipe", th: "สูตรประยุกต์จากร้านดังประตูผี ทิพย์สมัย" },
      story: {
        en: "Pad Thai was popularized in the late 1930s by Prime Minister Plaek Phibunsongkhram to promote nationalism and rice consumption. It combines Chinese stir-fry with classic Thai flavor dimensions (sour, sweet, salty).",
        th: "ผัดไทยถูกเผยแพร่และทำให้เป็นที่นิยมในช่วงปลายทศวรรษ 1930 โดยจอมพล ป. พิบูลสงคราม เพื่อส่งเสริมชาตินิยมและรณรงค์ให้บริโภคข้าว เป็นการผสมผสานเทคนิคการผัดแบบจีนเข้ากับมิติรสชาติไทยดั้งเดิม (เปรี้ยว หวาน เค็ม)"
      },
      flag: "🇹🇭"
    },
    difficulty: "Intermediate",
    prepTime: { en: "20 min", th: "20 นาที" },
    cookTime: { en: "10 min", th: "10 นาที" },
    servings: 2,
    nutrition: { calories: 610, protein: "24g", carbs: "88g", fat: "18g" },
    ingredients: [
      {
        item: { en: "Rice noodles (Sen Jan)", th: "เส้นเล็กหรือเส้นจันท์" },
        amount: { en: "150g", th: "150 กรัม" },
        note: { en: "Soaked in warm water for 1 hour", th: "แช่น้ำอุ่นไว้ 1 ชั่วโมงจนนิ่ม" }
      },
      {
        item: { en: "Fresh shrimp", th: "กุ้งสด" },
        amount: { en: "6 pieces", th: "6 ตัว" },
        note: { en: "Peeled and deveined", th: "แกะเปลือกผ่าหลังเอาเส้นดำออก" }
      },
      {
        item: { en: "Tamarind paste concentrate", th: "น้ำมะขามเปียกเข้มข้น" },
        amount: { en: "3 tbsp", th: "3 ช้อนโต๊ะ" },
        note: { en: "The backbone of sourness", th: "แกนหลักของรสเปรี้ยวกลมกล่อม" }
      },
      {
        item: { en: "Palm sugar", th: "น้ำตาลปี๊บ" },
        amount: { en: "3 tbsp", th: "3 ช้อนโต๊ะ" },
        note: { en: "For traditional sweetness", th: "เพื่อความหวานนวลละมุน" }
      },
      {
        item: { en: "Fish sauce", th: "น้ำปลาแท้" },
        amount: { en: "2.5 tbsp", th: "2.5 ช้อนโต๊ะ" },
        note: { en: "For salty depth", th: "เพื่อมิติความเค็มหอม" }
      },
      {
        item: { en: "Firm tofu", th: "เต้าหู้เหลืองแข็ง" },
        amount: { en: "80g", th: "80 กรัม" },
        note: { en: "Cut into small matchsticks", th: "หั่นเต๋าเล็กหรือแท่งเล็ก" }
      }
    ],
    steps: [
      {
        number: 1,
        instruction: {
          en: "Soak rice noodles in warm water for 45-60 minutes until pliable but still firm in the center. Drain well.",
          th: "แช่เส้นเล็กในน้ำอุ่นเป็นเวลา 45-60 นาทีจนเส้นอ่อนนิ่มแต่ยังมีแกนแข็งเล็กน้อยด้านใน แล้วสะเด็ดน้ำออก"
        },
        timer: { duration: 2700, label: { en: "Soak Rice Noodles", th: "แช่เส้นเล็ก" } },
        tip: {
          en: "Never boil Pad Thai noodles! Stir-frying will cook them the rest of the way.",
          th: "ห้ามต้มเส้นผัดไทยเด็ดขาด! การผัดจะทำให้เส้นสุกพอดีเอง"
        }
      },
      {
        number: 2,
        instruction: {
          en: "Prepare the sauce: Melt palm sugar in a small saucepan, stir in tamarind paste and fish sauce. Simmer until slightly syrupy.",
          th: "ทำน้ำปรุงผัดไทย: เคี่ยวน้ำตาลปี๊บในหม้อเล็ก ผสมน้ำมะขามเปียกและน้ำปลาลงไป เคี่ยวไฟอ่อนจนเหนียวข้นเล็กน้อย"
        },
        timer: { duration: 300, label: { en: "Make Tamarind Sauce", th: "ทำซอสมะขามเปียก" } },
        tip: {
          en: "A true Pad Thai has a balanced ratio of 1:1:1 sour, sweet, and salty. Do not use vinegar!",
          th: "ผัดไทยที่แท้จริงต้องมีรสเปรี้ยว หวาน เค็ม สมดุลเท่าๆ กัน ห้ามใช้น้ำส้มสายชู!"
        }
      },
      {
        number: 3,
        instruction: {
          en: "Heat oil in a wok. Sear tofu and shrimp. Push to side, crack in eggs and scramble, then toss in noodles, sauce, chives, and bean sprouts.",
          th: "ตั้งน้ำมันในกระทะร้อน ใส่เต้าหู้และกุ้งลงจี่พอสุก ดันไปข้างกระทะ ตอกไข่ลงไปยีพอเซ็ตตัว จากนั้นใส่เส้น ซอสผัดไทย ใบกุยช่าย และถั่วงอกลงผัดคลุกเคล้า"
        },
        tip: {
          en: "If the noodles are too firm, sprinkle 1-2 tbsp of water into the hot wok to create instant steam.",
          th: "หากเส้นแข็งเกินไป ให้พรมน้ำเปล่า 1-2 ช้อนโต๊ะลงในกระทะเพื่อให้เกิดไอน้ำช่วยอบเส้นให้นิ่ม"
        }
      }
    ],
    communityMadeCount: 384,
    todayViews: 845,
    rating: 4.8,
    tags: {
      en: ["Thai", "Noodles", "Intermediate", "Quick"],
      th: ["ไทย", "ก๋วยเตี๋ยว", "ระดับกลาง", "รวดเร็ว"]
    }
  },
  {
    id: "margherita-pizza",
    title: { en: "Classic Margherita Pizza", th: "พิซซ่ามาร์เกริต้า" },
    subtitle: { en: "Neapolitan-Style Woodfired Sourdough Pizza", th: "พิซซ่าสไตล์เนเปิลส์หน้าซอสมะเขือเทศและชีสมอสซาเรลล่าสด" },
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800",
    origin: {
      cuisine: { en: "Italian", th: "อิตาเลียน" },
      region: { en: "Naples, Campania", th: "เนเปิลส์, คัมปาเนีย" },
      source: { en: "Inspired by L'Antica Pizzeria", th: "แรงบันดาลใจจากร้านดังในเนเปิลส์" },
      story: {
        en: "Legend has it that in 1889, pizzaiolo Raffaele Esposito created a pizza representing the colors of the Italian flag (red tomato, white mozzarella, green basil) to honor Queen Margherita of Savoy.",
        th: "ตำนานเล่าว่าในปี ค.ศ. 1889 คนทำพิซซ่านามว่า รัฟฟาเอเล เอสโปซิโต ได้คิดค้นพิซซ่าที่เลียนแบบสีของธงชาติอิตาลี (สีแดงจากมะเขือเทศ สีขาวจากมอสซาเรลล่า และสีเขียวจากใบโหระพาฝรั่ง) เพื่อถวายเกียรติแก่พระราชินีมาร์เกริต้าแห่งซาวอย"
      },
      flag: "🇮🇹"
    },
    difficulty: "Beginner",
    prepTime: { en: "15 min", th: "15 นาที" },
    cookTime: { en: "8 min", th: "8 นาที" },
    servings: 2,
    nutrition: { calories: 540, protein: "22g", carbs: "68g", fat: "16g" },
    ingredients: [
      {
        item: { en: "Pizza dough ball", th: "แป้งพิซซ่าโดว์" },
        amount: { en: "1 ball (250g)", th: "1 ก้อน (250 กรัม)" },
        note: { en: "High-hydration fermented dough", th: "โดว์หมักสูตรไฮเดรชันสูงเนื้อนุ่มเหนียว" }
      },
      {
        item: { en: "San Marzano tomatoes", th: "มะเขือเทศซานมาร์ซาโน" },
        amount: { en: "100g", th: "100 กรัม" },
        note: { en: "Canned, crushed by hand", th: "ชนิดกระป๋อง นำมาบดด้วยมือพร้อมเกลือเล็กน้อย" }
      },
      {
        item: { en: "Fresh Mozzarella", th: "ชีสมอสซาเรลล่าสด" },
        amount: { en: "80g", th: "80 กรัม" },
        note: { en: "Torn and drained", th: "ฉีกเป็นชิ้นๆ และซับน้ำออก" }
      },
      {
        item: { en: "Fresh basil leaves", th: "ใบโหระพาฝรั่ง (อิตาเลียนเบซิล)" },
        amount: { en: "6-8 leaves", th: "6-8 ใบ" },
        note: null
      }
    ],
    steps: [
      {
        number: 1,
        instruction: {
          en: "Preheat home oven to maximum (usually 250°C) with a pizza stone inside for at least 45 minutes.",
          th: "วอร์มเตาอบที่ไฟแรงสุด (ประมาณ 250°C) พร้อมใส่หินอบพิซซ่าทิ้งไว้อย่างน้อย 45 นาที"
        },
        timer: { duration: 2700, label: { en: "Preheat Pizza Stone", th: "อุ่นหินอบพิซซ่า" } },
        tip: {
          en: "A screaming hot stone mimics the intense floor heat of a woodfired oven.",
          th: "หินอบที่ร้อนจัดจะช่วยเลียนแบบอุณหภูมิพื้นเตาถ่านดินเผาดั้งเดิม"
        }
      },
      {
        number: 2,
        instruction: {
          en: "Stretch the dough ball by hand from the center outward to push gas into the rim. Do not use a rolling pin.",
          th: "แผ่แป้งด้วยมือโดยกดจากตรงกลางไล่ลมออกไปที่ขอบ ห้ามใช้ไม้คลึงแป้งเด็ดขาด"
        },
        tip: {
          en: "Never roll Neapolitan dough! A rolling pin destroys all the beautiful micro air bubbles that make the crust light and airy.",
          th: "ห้ามใช้ไม้คลึง! เพราะจะทำลายฟองอากาศขนาดเล็กในแป้งที่ช่วยให้ขอบฟูหนานุ่มยืดหยุ่น"
        }
      }
    ],
    communityMadeCount: 512,
    todayViews: 2311,
    rating: 4.7,
    tags: {
      en: ["Italian", "Pizza", "Beginner", "Vegetarian"],
      th: ["อิตาเลียน", "พิซซ่า", "มือใหม่", "มังสวิรัติ"]
    }
  },
  {
    id: "chocolate-souffle",
    title: { en: "French Chocolate Soufflé", th: "ช็อกโกแลตซูเฟล่" },
    subtitle: { en: "A Luxurious, Airy & Melt-in-your-mouth Classic", th: "ขนมอบฝรั่งเศสสูตรคลาสสิก เนื้อนุ่มเบาละลายในปาก" },
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800",
    origin: {
      cuisine: { en: "French", th: "ฝรั่งเศส" },
      region: { en: "Paris", th: "ปารีส" },
      source: { en: "Auguste Escoffier school style", th: "สไตล์ตำรับของอ็อกุสต์ แอ็สกอฟีเย" },
      story: {
        en: "Created in late 18th-century France, the soufflé takes its name from the French verb 'souffler' (to blow up or puff). It became a benchmark of haute cuisine under Chef Antoine Beauvilliers.",
        th: "ถูกคิดค้นขึ้นในฝรั่งเศสช่วงปลายศตวรรษที่ 18 คำว่า ซูเฟล่ (Soufflé) มาจากคำกริยาภาษาฝรั่งเศส 'Souffler' ซึ่งหมายถึง 'การเป่าหรือทำให้พองขึ้น' มันกลายเป็นสัญลักษณ์ความประณีตของอาหารชั้นสูงฝรั่งเศส"
      },
      flag: "🇫🇷"
    },
    difficulty: "Chef",
    prepTime: { en: "25 min", th: "25 นาที" },
    cookTime: { en: "15 min", th: "15 นาที" },
    servings: 4,
    nutrition: { calories: 320, protein: "8g", carbs: "34g", fat: "18g" },
    ingredients: [
      {
        item: { en: "Dark chocolate (70% cocoa)", th: "ช็อกโกแลตดำ (โกโก้ 70%)" },
        amount: { en: "120g", th: "120 กรัม" },
        note: { en: "High quality, chopped", th: "คุณภาพดี สับละเอียด" }
      },
      {
        item: { en: "Butter", th: "เนยจืด" },
        amount: { en: "50g", th: "50 กรัม" },
        note: { en: "Plus extra to coat ramekins", th: "และเตรียมส่วนสำหรับทาถ้วยเคลือบ" }
      },
      {
        item: { en: "Eggs", th: "ไข่ไก่" },
        amount: { en: "4", th: "4 ฟอง" },
        note: { en: "Separated into yolks and whites", th: "แยกไข่แดงและไข่ขาวที่อุณหภูมิห้อง" }
      }
    ],
    steps: [
      {
        number: 1,
        instruction: {
          en: "Brush softened butter vertically inside ramekins, coat with cocoa powder, and tap out excess.",
          th: "ใช้แปรงทาเนยเหลวตามแนวตั้งขึ้นด้านบนถ้วยแรมคิน โรยผงโกโก้ให้เคลือบทั่วแล้วเคาะส่วนเกินออก"
        },
        tip: {
          en: "Brushing butter vertically creates direct paths that help the batter climb smoothly and rise straight up.",
          th: "การทาเนยในแนวขึ้นด้านบนจะสร้างทางขึ้นเพื่อช่วยให้หน้าเค้กไต่ขึ้นตัวได้สม่ำเสมอและไม่เอียงเบี้ยว"
        }
      }
    ],
    communityMadeCount: 92,
    todayViews: 512,
    rating: 4.6,
    tags: {
      en: ["French", "Desserts", "Chef", "Sweet"],
      th: ["ฝรั่งเศส", "ของหวาน", "เชฟยอดฝีมือ", "หวานรสละมุน"]
    }
  },
  {
    id: "butter-chicken",
    title: { en: "Fragrant Delhi Butter Chicken", th: "แกงบัตเตอร์ชิกเก้น" },
    subtitle: { en: "Tender Smoky Chicken in Creamy Tomato Sauce", th: "ไก่ย่างหอมเตาดินเผาในแกงมะเขือเทศครีมเนยเข้มข้นสไตล์นิวเดลี" },
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800",
    origin: {
      cuisine: { en: "Indian", th: "อินเดีย" },
      region: { en: "New Delhi", th: "นิวเดลี" },
      source: { en: "Moti Mahal legend adaptation", th: "ตำรับดั้งเดิมร้าน โมติ มาฮาล" },
      story: {
        en: "Butter Chicken (Murgh Makhani) was invented by Kundan Lal Gujral at Moti Mahal restaurant in 1950s. To keep cooked tandoori chicken pieces from drying out, he simmered them in a rich tomato, butter, and cream sauce.",
        th: "แกงไก่ใส่เนยหรือ 'Murgh Makhani' ถูกคิดค้นโดย คุณกุนดัน ลาล กุจราล ที่ร้านอาหาร Moti Mahal ในทศวรรษ 1950 เพื่อหลีกเลี่ยงไม่ให้เนื้อไก่ย่างทันดูรีแห้งแข็งเกินไป เขาจึงริเริ่มนำมาเคี่ยวกับซอสมะเขือเทศที่ผสมผสานเนยและครีมจนเข้มข้น"
      },
      flag: "🇮🇳"
    },
    difficulty: "Intermediate",
    prepTime: { en: "20 min", th: "20 นาที" },
    cookTime: { en: "30 min", th: "30 นาที" },
    servings: 4,
    nutrition: { calories: 640, protein: "34g", carbs: "18g", fat: "44g" },
    ingredients: [
      {
        item: { en: "Chicken thighs", th: "สะโพกไก่" },
        amount: { en: "800g", th: "800 กรัม" },
        note: { en: "Boneless, cut into pieces", th: "เลาะกระดูก หั่นขนาดพอดีคำ" }
      },
      {
        item: { en: "Greek yogurt", th: "กรีกโยเกิร์ต" },
        amount: { en: "120g", th: "120 กรัม" },
        note: { en: "For tenderizing marinade", th: "สำหรับหมักเพื่อเพิ่มความนุ่ม" }
      },
      {
        item: { en: "Butter", th: "เนยจืด" },
        amount: { en: "80g", th: "80 กรัม" },
        note: { en: "Split into batches", th: "แบ่งส่วนใช้ผัดและทำแกง" }
      },
      {
        item: { en: "Kasuri Methi (Fenugreek)", th: "ใบฟีนูกรีกแห้ง (เมथी)" },
        amount: { en: "1 tbsp", th: "1 ช้อนโต๊ะ" },
        note: { en: "The absolute signature flavor", th: "สมุนไพรกลิ่นหอมเฉพาะตัวขาดไม่ได้" }
      }
    ],
    steps: [
      {
        number: 1,
        instruction: {
          en: "Marinate chicken in yogurt, lemon, and spices for at least 2 hours (ideally overnight).",
          th: "หมักสะโพกไก่กับกรีกโยเกิร์ต น้ำเลมอน และเครื่องเทศต่างๆ อย่างน้อย 2 ชั่วโมง (หมักข้ามคืนดีที่สุด)"
        },
        timer: { duration: 7200, label: { en: "Marinate Chicken", th: "หมักสะโพกไก่" } },
        tip: {
          en: "Yogurt contains lactic acid which gently tenderizes the chicken fibers without making them mushy.",
          th: "โยเกิร์ตมีกรดแลคติกตามธรรมชาติที่ช่วยทำลายใยกล้ามเนื้อไก่ให้อ่อนนุ่มละมุนลิ้นโดยไม่ยุ่ยเละ"
        }
      }
    ],
    communityMadeCount: 310,
    todayViews: 1102,
    rating: 4.8,
    tags: {
      en: ["Indian", "Curry", "Chicken", "Warm", "Intermediate"],
      th: ["อินเดีย", "แกงกะหรี่", "ไก่", "อบอุ่น", "ระดับกลาง"]
    }
  },

  // DORM MODE SPECIFIC RECIPES (Tagged dormFriendly: true)
  {
    id: "milk-ramen",
    dormFriendly: true,
    title: { en: "Creamy Milk Ramen", th: "มาม่าต้มนมสดครีมมี่" },
    subtitle: {
      en: "The legendary dorm hack — instant noodles simmered in rich milk",
      th: "เมนูฟิวชันในตำนานของเด็กหอ ต้มเส้นมาม่าในนมสดรสจืดให้ข้นนัวฟินสุดๆ"
    },
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=800",
    origin: {
      cuisine: { en: "Dorm Special", th: "เมนูพิเศษเด็กหอ" },
      region: { en: "Thai Student Hack", th: "เคล็ดลับนักศึกษาไทย" },
      source: { en: "Passed down through student forums", th: "สูตรลับส่งต่อชาวหอพักยุคปี 2000" },
      story: {
        en: "Created by students with only a basic electric kettle, this hack combines cheap instant noodles with fresh milk to simulate a rich, creamy Tonkotsu-style broth at a fraction of the cost.",
        th: "ริเริ่มโดยกลุ่มนักศึกษาที่มีเพียงกาต้มน้ำไฟฟ้าขนาดเล็ก เมนูนี้นำบะหมี่กึ่งสำเร็จรูปรสเผ็ดมาต้มในนมสดรสจืดเพื่อเปลี่ยนน้ำซุปใสให้เป็นน้ำซุปข้นหนืดละมุนเลียนแบบราเม็งราคาแพง"
      },
      flag: "🎓"
    },
    difficulty: "Beginner",
    prepTime: { en: "1 min", th: "1 นาที" },
    cookTime: { en: "4 min", th: "4 นาที" },
    servings: 1,
    estimatedCost: { amount: 20, currency: "THB", tier: "green" },
    equipment: ["kettle"],
    nutrition: { calories: 420, protein: "12g", carbs: "52g", fat: "18g" },
    ingredients: [
      {
        item: { en: "Instant noodles (Tom Yum flavor)", th: "บะหมี่กึ่งสำเร็จรูป (แนะนำรสต้มยำน้ำข้น)" },
        amount: { en: "1 pack", th: "1 ซอง" },
        note: { en: "Spicy flavor works best with milk", th: "รสชาติจัดจ้านจะตัดกับความมันของนมพอดิบพอดี" }
      },
      {
        item: { en: "Fresh milk (Plain)", th: "นมสดพาสเจอร์ไรส์รสจืด" },
        amount: { en: "200ml", th: "200 มล." },
        note: { en: "Full-fat milk is recommended", th: "แนะนำชนิดไขมันเต็มส่วนเพื่อให้ข้นสะใจ" }
      },
      {
        item: { en: "Processed cheese slice", th: "ชีสแผ่นสไลด์" },
        amount: { en: "1 slice", th: "1 แผ่น" },
        note: { en: "Adds rich gooey texture", th: "เพิ่มความยืดนุ่มเค็มมันสะใจ" }
      }
    ],
    steps: [
      {
        number: 1,
        instruction: {
          en: "Boil 150ml of water in your kettle, then pour into a large bowl. Drop in the noodles.",
          th: "ต้มน้ำเปล่า 150 มล. ในกาต้มน้ำร้อนให้เดือดจัด จากนั้นเทใส่ชามใบใหญ่แล้วใส่เส้นมาม่าลงไป"
        },
        timer: { duration: 120, label: { en: "Soak noodles", th: "แช่เส้นมาม่า" } },
        tip: {
          en: "Do not use only milk initially, as boiling milk can overflow easily inside electric kettles!",
          th: "อย่าพึ่งใช้นมล้วนต้มในกาตั้งแต่แรกเด็ดขาด นมจะล้นเตือนภัยฟองฟูทำความสะอาดยากมาก!"
        }
      },
      {
        number: 2,
        instruction: {
          en: "Pour out half the water. Add 200ml of fresh milk and the seasoning powder (use only 1/2 of seasoning to avoid over-salting). Kettle-heat for 1 minute.",
          th: "รินน้ำร้อนทิ้งครึ่งหนึ่ง เติมนมสดลงไป 200 มล. พร้อมเครื่องปรุงมาม่า (ใส่แค่ครึ่งซองก่อนกันเค็มจัด) นำเข้าอุ่นร้อน 1 นาที"
        },
        timer: { duration: 60, label: { en: "Simmer in milk", th: "อุ่นซุปนมสด" } },
        tip: {
          en: "Keep a close eye. Turn off heat just as the milk begins to steam. Do not let it boil vigorously or the milk will separate.",
          th: "คอยสังเกตพอเริ่มมีไออุ่นโชยขึ้นมาให้หยุดทันที อย่าปล่อยเดือดพล่านเพราะนมจะแตกตัวเป็นก้อน"
        }
      },
      {
        number: 3,
        instruction: {
          en: "Top with a slice of processed cheese and stir until completely melted. Serve immediately!",
          th: "วางชีสแผ่นสไลด์ลงไปด้านบน ปล่อยให้ละลายเข้ากันกับเส้นร้อนๆ แล้วคนให้เนียนพร้อมอร่อยทันที!"
        },
        tip: {
          en: "Eat fast — milk ramen waits for no one!",
          th: "รีบทานขณะร้อนๆ ซุปนมอุ่นจะเข้มข้นที่สุดถ้าปล่อยเย็นเส้นจะอืดนะจ๊ะ!"
        }
      }
    ],
    communityMadeCount: 892,
    todayViews: 3456,
    rating: 4.8,
    tags: {
      en: ["Noodle Hacks", "Instant", "Kettle", "Budget"],
      th: ["มาม่าดัดแปลง", "สำเร็จรูป", "กาต้มน้ำ", "ประหยัด"]
    }
  },
  {
    id: "egg-drop-mama",
    dormFriendly: true,
    title: { en: "Classic Egg Drop Mama", th: "มาม่าใส่ไข่เมฆหมอก" },
    subtitle: {
      en: "Traditional comfort instant noodles with fluffy egg ribbon swirls",
      th: "เมนูพื้นฐานของนักศึกษา บะหมี่กึ่งสำเร็จรูปตีไข่ฝอยลอยนุ่มเป็นริ้วปุยเมฆ"
    },
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800",
    origin: {
      cuisine: { en: "Dorm Special", th: "เมนูพิเศษเด็กหอ" },
      region: { en: "Everyday Staple", th: "มื้อประทังชีวิตประจำวัน" },
      source: { en: "Classic student kitchen hack", th: "เทคนิคเด็ดคู่ครัวเด็กหอทั่วราชอาณาจักร" },
      story: {
        en: "The absolute baseline of student nutrition. This simple dish transforms a standard packet of instant noodles into a rich, velvety broth by gently swirling raw egg into hot water.",
        th: "เมนูพื้นฐานที่สุดสำหรับการยังชีพในรั้วมหาลัย สูตรนี้ยกระดับซุปบะหมี่ธรรมดาให้มีเนื้อสัมผัสเข้มข้นเนียนนุ่มเพียงค่อยๆ หยอดไข่ไก่ดิบลงไปเป็นสายขณะซุปกำลังร้อนจัด"
      },
      flag: "🎓"
    },
    difficulty: "Beginner",
    prepTime: { en: "1 min", th: "1 นาที" },
    cookTime: { en: "4 min", th: "4 นาที" },
    servings: 1,
    estimatedCost: { amount: 18, currency: "THB", tier: "green" },
    equipment: ["kettle"],
    nutrition: { calories: 380, protein: "14g", carbs: "45g", fat: "14g" },
    ingredients: [
      {
        item: { en: "Instant noodles (Minced Pork flavor)", th: "บะหมี่กึ่งสำเร็จรูป (แนะนำรสหมูสับ)" },
        amount: { en: "1 pack", th: "1 ซอง" },
        note: null
      },
      {
        item: { en: "Egg", th: "ไข่ไก่สด" },
        amount: { en: "1", th: "1 ฟอง" },
        note: { en: "Beaten in a cup", th: "ตีให้เข้ากันในแก้วเตรียมไว้" }
      }
    ],
    steps: [
      {
        number: 1,
        instruction: {
          en: "Boil 350ml water in your electric kettle. Pour over noodles and seasoning in a bowl.",
          th: "ต้มน้ำเปล่า 350 มล. ในกาต้มน้ำร้อนให้เดือดจัด จากนั้นเทใส่ชามมาม่าที่ใส่เครื่องปรุงเตรียมไว้แล้ว"
        },
        timer: { duration: 150, label: { en: "Noodle cook", th: "ต้มเส้นมาม่า" } }
      },
      {
        number: 2,
        instruction: {
          en: "Immediately pour the beaten egg in a slow, steady stream while gently stirring the soup to create thin ribbons.",
          th: "รีบเทไข่ไก่ที่ตีแล้วโรยลงไปเป็นสายเบาๆ ทันที พร้อมใช้ตะเกียบคนน้ำซุปเป็นวงกลมให้ไข่กระจายตัวสวยงาม"
        },
        tip: {
          en: "Do not stir too vigorously, or the egg will make the broth muddy instead of beautiful fluffy clouds.",
          th: "อย่าคนแรงเกินไปจนซุปขุ่นเละ ค่อยๆ วนตะเกียบจะทำให้ไข่จับตัวเป็นริ้วปุยเมฆลอยสวยน่าทาน"
        }
      }
    ],
    communityMadeCount: 1205,
    todayViews: 5410,
    rating: 4.9,
    tags: {
      en: ["Noodle Hacks", "Comfort", "Kettle", "Budget"],
      th: ["มาม่าดัดแปลง", "อาหารอบอุ่น", "กาต้มน้ำ", "ประหยัด"]
    }
  },
  {
    id: "stir-fried-mama",
    dormFriendly: true,
    title: { en: "Rice Cooker Stir-Fried Noodles", th: "ผัดมาม่าแห้งด้วยหม้อหุงข้าว" },
    subtitle: {
      en: "Wok-style stir-fried instant noodles cooked inside a basic rice cooker",
      th: "ผัดมาม่าแห้งทรงเครื่องกระเทียมเจียว ทำได้ง่ายๆ แค่ใช้หม้อหุงข้าวหอพัก"
    },
    image: "https://images.unsplash.com/photo-1626804475315-9644b37a2fe4?q=80&w=800",
    origin: {
      cuisine: { en: "Dorm Special", th: "เมนูพิเศษเด็กหอ" },
      region: { en: "Rice Cooker Hacks", th: "เคล็ดลับคู่หม้อหุงข้าว" },
      source: { en: "Dorm room chef community", th: "เพจสมาคมเชฟห้องเช่าและเด็กหอ" },
      story: {
        en: "When a stove is forbidden by dorm rules, students utilize the heating element of a rice cooker to saute and fry noodles, achieving surprisingly crispy results.",
        th: "เมื่อกฎระเบียบของหอพักห้ามใช้เตาแก๊สหรือเตาไฟฟ้ากำลังสูง นักศึกษาจึงหันมาใช้ประโยชน์จากปุ่ม 'Cook' ของหม้อหุงข้าวเพื่อผัดอาหารได้เกรียมกรอบน่ารับประทาน"
      },
      flag: "🎓"
    },
    difficulty: "Beginner",
    prepTime: { en: "2 min", th: "2 นาที" },
    cookTime: { en: "6 min", th: "6 นาที" },
    servings: 1,
    estimatedCost: { amount: 25, currency: "THB", tier: "green" },
    equipment: ["rice_cooker"],
    nutrition: { calories: 450, protein: "15g", carbs: "50g", fat: "16g" },
    ingredients: [
      {
        item: { en: "Instant noodles", th: "บะหมี่กึ่งสำเร็จรูป" },
        amount: { en: "1 pack", th: "1 ซอง" },
        note: { en: "Soaked in warm water to soften", th: "แช่น้ำให้นิ่มหมาดๆ ห้ามแช่นาน" }
      },
      {
        item: { en: "Egg", th: "ไข่ไก่" },
        amount: { en: "1", th: "1 ฟอง" },
        note: null
      },
      {
        item: { en: "Cooking oil or butter", th: "น้ำมันพืชหรือเนย" },
        amount: { en: "1 tbsp", th: "1 ช้อนโต๊ะ" },
        note: null
      }
    ],
    steps: [
      {
        number: 1,
        instruction: {
          en: "Press the 'Cook' button on your rice cooker. Heat oil, crack in the egg, and scramble on the bottom of the pot.",
          th: "กดสวิตช์หุงข้าว (Cook) รอหม้อร้อนแล้วใส่น้ำมันพืช ตอกไข่ไก่ลงไปใช้ทัพพียีให้กึ่งสุกกึ่งดิบตรงก้นหม้อ"
        },
        timer: { duration: 120, label: { en: "Scramble egg", th: "ผัดไข่ในหม้อ" } },
        tip: {
          en: "If the rice cooker turns to 'Warm' mode too early, keep the lid closed for a minute to build heat or hold down the switch carefully.",
          th: "หากสวิตช์เด้งไปที่อุ่นเร็วเกินไป ให้ปิดฝาหม้อไว้สักครู่เพื่อสะสมความร้อน หรือประคองกดสวิตช์อย่างระมัดระวัง"
        }
      },
      {
        number: 2,
        instruction: {
          en: "Toss in softened noodles and seasoning powder. Toss quickly using a spoon or chopstick for 3 minutes until fragrant.",
          th: "ใส่เส้นมาม่าที่พอนิ่มแล้วและเครื่องปรุงลงไป ใช้ช้อนหรือตะเกียบยาวผัดคลุกเคล้ากับไข่ในหม้ออย่างรวดเร็ว 3 นาทีจนหอมชวนทาน"
        },
        timer: { duration: 180, label: { en: "Fry noodles", th: "ผัดเส้นมาม่าทรงเครื่อง" } }
      }
    ],
    communityMadeCount: 412,
    todayViews: 1890,
    rating: 4.7,
    tags: {
      en: ["Noodle Hacks", "Rice Cooker", "Quick", "Budget"],
      th: ["มาม่าดัดแปลง", "หม้อหุงข้าว", "รวดเร็ว", "ประหยัด"]
    }
  },
  {
    id: "microwave-mug-cake",
    dormFriendly: true,
    title: { en: "90-Sec Microwave Mug Cake", th: "เค้กช็อกโกแลตในถ้วยมัค 90 วินาที" },
    subtitle: {
      en: "Decadent chocolate cake prepared entirely in a single mug and microwave",
      th: "เค้กช็อกโกแลตเนื้อนุ่มอุ่นๆ ทำง่ายๆ ในแก้วใบโปรดด้วยไมโครเวฟเครื่องเดียว"
    },
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800",
    origin: {
      cuisine: { en: "Sweet Treats", th: "ของหวานล้างปาก" },
      region: { en: "Microwave Magic", th: "มนต์สะกดไมโครเวฟ" },
      source: { en: "Midnight dessert craving recipe", th: "สูตรลับดับกระหายของหวานยามดึก" },
      story: {
        en: "Invented in modern office and college dorm break rooms. By mixing basic pantry items in a ceramic mug and microwaving, the steam creates an instant cake-like fluffiness in seconds.",
        th: "คิดค้นขึ้นในแผนกต้อนรับออฟฟิศและห้องครัวในหอพักนักศึกษา เพียงผสมวัตถุดิบแห้งพื้นฐานในถ้วยเซรามิกแล้วนำไปเวฟ ไอน้ำร้อนระอุจะดันตัวแป้งเค้กให้พองฟูขึ้นเป็นเค้กพร้อมทานแสนอร่อยในพริบตา"
      },
      flag: "🎓"
    },
    difficulty: "Beginner",
    prepTime: { en: "2 min", th: "2 นาที" },
    cookTime: { en: "1.5 min", th: "1.5 นาที" },
    servings: 1,
    estimatedCost: { amount: 30, currency: "THB", tier: "green" },
    equipment: ["microwave"],
    nutrition: { calories: 290, protein: "4g", carbs: "38g", fat: "12g" },
    ingredients: [
      {
        item: { en: "All-purpose flour", th: "แป้งสาลีอเนกประสงค์" },
        amount: { en: "4 tbsp", th: "4 ช้อนโต๊ะ" },
        note: null
      },
      {
        item: { en: "Sugar", th: "น้ำตาลทราย" },
        amount: { en: "2 tbsp", th: "2 ช้อนโต๊ะ" },
        note: null
      },
      {
        item: { en: "Cocoa powder", th: "ผงโกโก้แท้" },
        amount: { en: "2 tbsp", th: "2 ช้อนโต๊ะ" },
        note: null
      },
      {
        item: { en: "Milk", th: "นมสดรสจืด" },
        amount: { en: "3 tbsp", th: "3 ช้อนโต๊ะ" },
        note: null
      },
      {
        item: { en: "Melted butter or oil", th: "เนยละลายหรือน้ำมันพืช" },
        amount: { en: "1 tbsp", th: "1 ช้อนโต๊ะ" },
        note: null
      }
    ],
    steps: [
      {
        number: 1,
        instruction: {
          en: "Mix flour, sugar, and cocoa powder inside a microwave-safe ceramic mug. Whisk with a fork.",
          th: "ใส่แป้งสาลี น้ำตาลทราย และผงโกโก้ลงในแก้วมัคเซรามิกที่ทนความร้อนได้ดี ใช้ส้อมคนส่วนผสมแห้งให้เข้ากัน"
        },
        tip: {
          en: "Make sure to break up any big cocoa powder lumps before adding liquids.",
          th: "ควรบี้ผงโกโก้ที่จับตัวเป็นก้อนให้กระจายตัวให้หมดก่อนใส่น้ำ เพื่อลดคราบแป้งแห้งก้นถ้วย"
        }
      },
      {
        number: 2,
        instruction: {
          en: "Pour in milk and oil. Stir thoroughly until a smooth batter forms. Microwave for exactly 90 seconds on High.",
          th: "เติมนมสดและน้ำมันพืชลงไป คนผสมให้เหนียวเป็นเนื้อครีมเนียนไม่มีคราบแป้งแห้ง นำเข้าเวฟไฟสูงนาน 90 วินาที"
        },
        timer: { duration: 90, label: { en: "Microwave bake", th: "นำเข้าอบไมโครเวฟ" } },
        tip: {
          en: "The cake will rise dramatically then sink slightly. That is completely normal! Let it cool 1 minute.",
          th: "ตัวเค้กจะฟูสูงพ้นขอบถ้วยแล้วยุบตัวลงเล็กน้อยเมื่อเสร็จ ไม่ต้องตกใจ! ปล่อยให้เย็นลงสักครู่ก่อนตักทาน"
        }
      }
    ],
    communityMadeCount: 752,
    todayViews: 2110,
    rating: 4.8,
    tags: {
      en: ["Sweet Treats", "Microwave", "Quick", "Budget"],
      th: ["ของหวานล้างปาก", "ไมโครเวฟ", "รวดเร็ว", "ประหยัด"]
    }
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Recipes", labelTh: "ทั้งหมด" },
  { id: "japanese", label: "Japanese 🇯🇵", labelTh: "ญี่ปุ่น 🇯🇵" },
  { id: "thai", label: "Thai 🇹🇭", labelTh: "ไทย 🇹🇭" },
  { id: "italian", label: "Italian 🇮🇹", labelTh: "อิตาเลียน 🇮🇹" },
  { id: "french", label: "French 🇫🇷", labelTh: "ฝรั่งเศส 🇫🇷" },
  { id: "indian", label: "Indian 🇮🇳", labelTh: "อินเดีย 🇮🇳" },
  { id: "desserts", label: "Desserts 🍰", labelTh: "ของหวาน 🍰" },
  { id: "vegetarian", label: "Vegetarian 🥗", labelTh: "มังสวิรัติ 🥗" },
  { id: "beginner", label: "Beginner 🟢", labelTh: "ระดับมือใหม่ 🟢" }
];

export const DORM_CATEGORIES = [
  { id: "all", label: "Dorm All 🎓", labelTh: "เด็กหอทั้งหมด 🎓" },
  { id: "noodle hacks", label: "Noodle Hacks 🍜", labelTh: "มาม่าดัดแปลง 🍜" },
  { id: "rice cooker", label: "Rice Cooker 🍚", labelTh: "เมนูหม้อหุงข้าว 🍚" },
  { id: "microwave", label: "Microwave Magic ⚡", labelTh: "ไมโครเวฟเสกได้ ⚡" },
  { id: "sweet treats", label: "Sweet Treats 🧁", labelTh: "ขนมล้างปาก 🧁" }
];

export const DORM_EQUIPMENT_PRESETS = [
  { id: "kettle", label: "Electric Kettle 🫖", labelTh: "กาต้มน้ำไฟฟ้า 🫖" },
  { id: "microwave", label: "Microwave ⚡", labelTh: "ไมโครเวฟ ⚡" },
  { id: "rice_cooker", label: "Rice Cooker 🍚", labelTh: "หม้อหุงข้าว 🍚" },
  { id: "toaster", label: "Bread Toaster 🍞", labelTh: "เครื่องปิ้งขนมปัง 🍞" }
];

export const UI_TRANSLATIONS = {
  en: {
    brand_name: "Chim Mai? recipe",
    brand_tagline: "Wanna taste?",
    nav_home: "Home",
    nav_recipes: "Recipes",
    nav_profile: "My Kitchen",
    btn_cooking_mode: "Enter Cooking Mode",
    btn_made_this: "I Made This!",
    btn_shopping_list: "Generate Shopping List",
    label_ingredients: "Ingredients",
    label_steps: "Steps",
    label_prep_time: "Prep Time",
    label_cook_time: "Cook Time",
    label_servings: "Servings",
    label_difficulty: "Difficulty",
    label_nutrition: "Nutrition Info",
    filter_all: "All",
    filter_under30: "Under 30 min",
    filter_beginner: "Beginner Friendly",
    dorm_mode: "Dorm Mode",
    dorm_tagline: "No kitchen? No problem!",
    hot_menu: "Trending Now 🔥",
    views_today: "views today",
    back_to_explore: "Back to Explore",
    saved: "Saved",
    save_for_later: "Save for Later",
    start_cooking: "Start Cooking",
    cultural_origin: "The Cultural Origin & Legend",
    attribution_heritage: "Attribution & Heritage",
    step_by_step: "Step-by-Step Guide",
    follow_traditional: "Follow traditional methods carefully.",
    enter_cooking_mode: "Enter Cooking Mode",
    heritage_tip: "Heritage Tip",
    timer_required: "Timer Required",
    community_journal: "Community Journal",
    community_desc: "View notes and logs from other heritage cooks.",
    have_you_prepared: "Have you prepared this?",
    heritage_score: "Heritage score",
    share_placeholder: "Share your experience, substitutes or tips... (e.g. 'Used honey instead of sugar, worked perfect!')",
    reference_photo: "A reference dish photo will be posted automatically!",
    log_cooking: "Log Cooking Accomplishment",
    no_logs: "No logs logged yet. Be the first to share your dish!",
    votes: "votes",
    adjust_servings: "Adjust Servings",
    auto_scales: "Auto-Scales",
    nutrition_summary: "Nutrition Summary",
    tick_in_stock: "Tick items in stock.",
    copied_journal: "Copied to Kitchen Journal!",
    compile_shopping: "Compile & Send to Shopping List",
    dorm_room_whats_in: "What's in my dorm room?",
    active_dorm_filters: "Dorm Equipment Filter",
    dorm_survival: "Dorm survival cooking! 💪",
    dorm_picks: "🎓 Dorm Picks of the Day",
    explore_authentic: "Explore Authentic Flavors",
    explore_desc: "Discover culinary legends, story origins, and cook like a professional.",
    fridge_intro: "Icebox Search Engine",
    fridge_desc: "Check ingredients you have, and we'll reveal matching cultural recipes.",
    fridge_placeholder: "Type ingredients you have...",
    journal_title: "My Kitchen Journal",
    journal_desc: "Track your accomplishments, shopping lists, and saved favorites.",
    completed_meals: "Completed Heritage Meals",
    no_completed: "You haven't logged any cooked meals yet.",
    watchlist: "Watchlist Favorites",
    no_watchlist: "Your watchlist is empty. Save recipes for later!",
    shopping_checklist: "Shopping Checklist",
    no_shopping: "Your shopping list is currently empty.",
    clear_all: "Clear All",
    reset_all: "Reset All Filters",
    no_recipes: "No matching recipes found.",
    try_resetting: "Try resetting filters or searching for another flavor!"
  },
  th: {
    brand_name: "ชิมไหม๋ รีซิปี",
    brand_tagline: "ชิมไหม?",
    nav_home: "หน้าแรก",
    nav_recipes: "สูตรอาหาร",
    nav_profile: "ครัวของฉัน",
    btn_cooking_mode: "เข้าสู่โหมดทำอาหาร",
    btn_made_this: "เคยทำสำเร็จ!",
    btn_shopping_list: "สร้างรายการซื้อของ",
    label_ingredients: "ส่วนผสม",
    label_steps: "ขั้นตอน",
    label_prep_time: "เวลาเตรียม",
    label_cook_time: "เวลาปรุง",
    label_servings: "จำนวนที่เสิร์ฟ",
    label_difficulty: "ระดับความยาก",
    label_nutrition: "ข้อมูลโภชนาการ",
    filter_all: "ทั้งหมด",
    filter_under30: "ไม่เกิน 30 นาที",
    filter_beginner: "เหมาะกับมือใหม่",
    dorm_mode: "โหมดเด็กหอ",
    dorm_tagline: "ไม่มีครัว ก็ทำได้!",
    hot_menu: "กำลังมาแรง 🔥",
    views_today: "คนดูวันนี้",
    back_to_explore: "กลับไปหน้าค้นหา",
    saved: "บันทึกแล้ว",
    save_for_later: "บันทึกไว้ทีหลัง",
    start_cooking: "เริ่มทำอาหาร",
    cultural_origin: "ที่มาและตำนานทางวัฒนธรรม",
    attribution_heritage: "แหล่งที่มาและมรดกอาหาร",
    step_by_step: "คู่มือทีละขั้นตอน",
    follow_traditional: "ปฏิบัติตามกรรมวิธีดั้งเดิมอย่างรอบคอบ",
    enter_cooking_mode: "เข้าสู่โหมดทำอาหารเต็มรูปแบบ",
    heritage_tip: "เคล็ดลับดั้งเดิม",
    timer_required: "ต้องใช้เครื่องตั้งเวลา",
    community_journal: "บันทึกของชุมชน",
    community_desc: "ดูบันทึกและคำแนะนำจากผู้ปรุงอาหารดั้งเดิมรายอื่น",
    have_you_prepared: "คุณเคยทำเมนูนี้ไหม?",
    heritage_score: "คะแนนมรดกอาหาร",
    share_placeholder: "แบ่งปันประสบการณ์การทำอาหาร วัตถุดิบที่ใช้แทน หรือคำแนะนำ... (เช่น 'ใช้นมข้นจืดแทนครีม อร่อยนัวเหมือนกันเลย!')",
    reference_photo: "รูปภาพอ้างอิงของอาหารจานนี้จะถูกโพสต์โดยอัตโนมัติ!",
    log_cooking: "บันทึกความสำเร็จในการทำอาหาร",
    no_logs: "ยังไม่มีประวัติบันทึก ร่วมแชร์อาหารจานแรกของคุณสิ!",
    votes: "โหวต",
    adjust_servings: "ปรับสัดส่วนอาหาร",
    auto_scales: "สัดส่วนปรับอัตโนมัติ",
    nutrition_summary: "สรุปข้อมูลโภชนาการ",
    tick_in_stock: "ทำเครื่องหมายวัตถุดิบที่มีอยู่",
    copied_journal: "คัดลอกลงบันทึกในครัวแล้ว!",
    compile_shopping: "รวมรวมและส่งไปยังรายการซื้อของ",
    dorm_room_whats_in: "มีอะไรในห้องหอของฉันบ้าง?",
    active_dorm_filters: "ตัวกรองอุปกรณ์ที่มีในห้องหอ",
    dorm_survival: "เด็กหอต้องรอด! 💪",
    dorm_picks: "🎓 เมนูแนะนำเด็กหอประจำวัน",
    explore_authentic: "สำรวจรสชาติระดับตำนาน",
    explore_desc: "ค้นพบตำนานการทำอาหาร เรื่องราวของอาหารต้นตำรับ และปรุงอาหารเหมือนมืออาชีพ",
    fridge_intro: "เครื่องมือค้นหาวัตถุดิบในตู้เย็น",
    fridge_desc: "ระบุวัตถุดิบที่คุณมี แล้วเราจะแนะนำสูตรอาหารดั้งเดิมที่เข้ากันให้",
    fridge_placeholder: "ระบุวัตถุดิบที่คุณมี...",
    journal_title: "บันทึกครัวของฉัน",
    journal_desc: "ติดตามความสำเร็จทางอาหาร รายการซื้อของ และเมนูโปรดที่บันทึกไว้",
    completed_meals: "อาหารที่ทำเสร็จแล้ว",
    no_completed: "คุณยังไม่ได้บันทึกเมนูที่ทำเสร็จเลย",
    watchlist: "เมนูโปรดที่บันทึกไว้",
    no_watchlist: "ไม่มีรายการเมนูโปรด บันทึกสูตรอาหารไว้ทำทีหลังได้นะ!",
    shopping_checklist: "รายการซื้อของในครัว",
    no_shopping: "รายการซื้อของของคุณว่างเปล่าในขณะนี้",
    clear_all: "ล้างทั้งหมด",
    reset_all: "รีเซ็ตตัวกรองทั้งหมด",
    no_recipes: "ไม่พบสูตรอาหารที่ตรงกัน",
    try_resetting: "ลองรีเซ็ตตัวกรองหรือค้นหาคำสำคัญอื่นๆ ดูนะ!"
  }
};

export function getTranslatedRecipes(
  lang: "en" | "th",
  dormMode: boolean,
  dormEquipments: string[] = []
): Recipe[] {
  let list = RAW_RECIPES;

  if (dormMode) {
    // Show only dorm friendly recipes
    list = list.filter((r) => r.dormFriendly);

    // If any equipment filters are checked, filter by them
    if (dormEquipments.length > 0) {
      list = list.filter((r) => {
        if (!r.equipment || r.equipment.length === 0) return true; // no cooking or extremely simple
        return r.equipment.some((eq) => dormEquipments.includes(eq));
      });
    }
  }

  return list.map((raw) => {
    return {
      id: raw.id,
      dormFriendly: raw.dormFriendly,
      title: raw.title[lang],
      subtitle: raw.subtitle[lang],
      image: raw.image,
      origin: {
        cuisine: raw.origin.cuisine[lang],
        region: raw.origin.region[lang],
        source: raw.origin.source[lang],
        story: raw.origin.story[lang],
        flag: raw.origin.flag
      },
      difficulty: raw.difficulty,
      prepTime: raw.prepTime[lang],
      cookTime: raw.cookTime[lang],
      servings: raw.servings,
      estimatedCost: raw.estimatedCost,
      equipment: raw.equipment,
      nutrition: raw.nutrition,
      ingredients: raw.ingredients.map((ing) => ({
        item: ing.item[lang],
        amount: ing.amount[lang],
        note: ing.note ? ing.note[lang] : undefined
      })),
      steps: raw.steps.map((step) => ({
        number: step.number,
        instruction: step.instruction[lang],
        tip: step.tip ? step.tip[lang] : undefined,
        timer: step.timer ? {
          duration: step.timer.duration,
          label: step.timer.label[lang]
        } : undefined
      })),
      communityMadeCount: raw.communityMadeCount,
      todayViews: raw.todayViews,
      rating: raw.rating,
      tags: raw.tags[lang]
    };
  });
}
