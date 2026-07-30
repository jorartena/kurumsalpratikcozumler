import {
  BarChart3,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Handshake,
  Mail,
  MapPinned,
  Network,
  PackageCheck,
  ShieldCheck,
  ShoppingBasket,
  Target,
  Truck,
} from "lucide-react";

export type Language = "tr" | "en";

export const languages: Record<Language, string> = {
  tr: "TR",
  en: "EN",
};

export const content = {
  tr: {
    nav: {
      services: "Hizmetler",
      process: "Süreç",
      principles: "Neden Biz",
      contact: "İletişim",
    },
    hero: {
      eyebrow: "Kurumsal tedarik ve teslimat çözümleri",
      title: "Kurumunuzun ihtiyaçlarını tek noktadan, hızlı ve güvenilir şekilde tedarik edin.",
      copy:
        "Optimal Kurumsal Çözümler; kamu kurumları, özel şirketler ve toplu alım yapan işletmeler için ürün tedariği, teklif hazırlama, lojistik takip ve teslimat süreçlerini profesyonel biçimde yönetir.",
      primary: "Teklif talep et",
      secondary: "Ürün gruplarını incele",
      stats: [
        { value: "6", label: "Ana ürün ve hizmet grubu" },
        { value: "Planlı", label: "Teslimat ve takip akışı" },
        { value: "Tek", label: "Muhatapla tedarik yönetimi" },
      ],
    },
    intro: {
      label: "Tedarikte pratik çözüm",
      title: "Talebinizden teslimata kadar süreci sizin adınıza sadeleştiririz.",
      copy:
        "Kurumsal ihtiyaçlar çoğu zaman farklı tedarikçiler, değişken fiyatlar ve takip edilmesi gereken teslimatlarla dağınık hale gelir. Biz bu süreci tek merkezden yönetilebilir, şeffaf ve zamanında ilerleyen bir tedarik akışına dönüştürürüz.",
    },
    segments: {
      label: "Kurum tipleri",
      title: "Kimler için çalışıyoruz?",
      copy: "Düzenli sarf tüketimi olan, çok kalemli alım yapan veya proje bazlı hızlı tedarik ihtiyacı duyan kurumlara operasyonel destek veririz.",
      items: [
        {
          icon: MapPinned,
          title: "Kamu kurumları ve belediyeler",
          copy: "Belge, teklif ve teslimat takibi gerektiren toplu ürün alımlarında düzenli tedarik akışı kurulur.",
        },
        {
          icon: Boxes,
          title: "Ofisler, tesisler ve işletmeler",
          copy: "Temizlik, kırtasiye, ambalaj ve günlük sarf ihtiyaçları tek merkezden planlanır.",
        },
        {
          icon: ShoppingBasket,
          title: "Yemekhane ve etkinlik operasyonları",
          copy: "Gıda, ikram, mutfak sarfı ve destek ürünleri için hızlı teklif ve teslimat koordinasyonu sağlanır.",
        },
      ],
    },
    services: {
      title: "Ürün ve hizmet grupları",
      copy:
        "Temizlikten ofis sarfına, gıdadan ambalaja kadar kurumların düzenli ve proje bazlı ihtiyaçları için hızlı teklif ve güvenilir tedarik desteği sağlanır.",
      items: [
        {
          icon: ClipboardCheck,
          title: "Kurumsal tedarik yönetimi",
          copy: "Kamu ve özel sektör kurumlarının çok kalemli ürün ihtiyaçları planlı, belgeli ve takip edilebilir şekilde yönetilir.",
        },
        {
          icon: Truck,
          title: "Lojistik ve teslimat hizmetleri",
          copy: "Onaylanan siparişler için teslimat planı oluşturulur; ürünlerin zamanında ve eksiksiz ulaşması takip edilir.",
        },
        {
          icon: ShieldCheck,
          title: "Temizlik ve hijyen ürünleri",
          copy: "Kurumsal alanlarda kullanılan temizlik, hijyen, sarf ve bakım ürünleri için toptan tedarik desteği sunulur.",
        },
        {
          icon: ShoppingBasket,
          title: "Gıda ve mutfak sarf ürünleri",
          copy: "Kurum mutfakları, yemekhaneler, etkinlikler ve operasyonel tüketimler için gıda ve ikram ürünleri temin edilir.",
        },
        {
          icon: PackageCheck,
          title: "Ambalaj ve paketleme çözümleri",
          copy: "Koli, poşet, streç, bant ve paketleme sarflarında ticari ve endüstriyel kullanıma uygun seçenekler sunulur.",
        },
        {
          icon: Boxes,
          title: "Ofis ve kırtasiye ürünleri",
          copy: "Ofislerin düzenli ihtiyaç duyduğu kırtasiye, yazıcı sarf, büro malzemeleri ve destek ürünleri ekonomik şekilde tedarik edilir.",
        },
      ],
    },
    supplyScope: {
      label: "Kapsam",
      title: "Tedarik kapsamı",
      copy: "Katalog yerine, hangi kalemlerde destek verebildiğimizi net gösteren kapsam kartları kullanıyoruz.",
      items: [
        "Temizlik kimyasalları, hijyen ürünleri ve sarf malzemeleri",
        "Gıda, içecek, ikram ve mutfak tüketim ürünleri",
        "Koli, poşet, streç, bant ve paketleme ürünleri",
        "Kırtasiye, yazıcı sarfı ve ofis destek ürünleri",
        "Endüstriyel sarf, bakım ve tesis destek ürünleri",
        "Proje bazlı özel ürün araştırması ve alternatif tedarik",
      ],
    },
    benefits: {
      title: "Kuruma katkısı",
      items: [
        "Farklı ürün grupları için tek muhatapla daha hızlı tedarik akışı sağlar.",
        "Teklif, onay, tedarik ve teslimat aşamalarını daha şeffaf hale getirir.",
        "Toplu ve düzenli alımlarda fiyat, süre ve kalite dengesini yönetmeyi kolaylaştırır.",
        "Kurumların operasyon ekiplerinin satın alma ve takip yükünü azaltır.",
      ],
    },
    process: {
      title: "Nasıl çalışır?",
      copy: "Talebinizi aldıktan sonra ürün kapsamını netleştirir, fiyat teklifini hazırlar, onay sonrası tedarik ve teslimat sürecini takip ederiz.",
      steps: [
        {
          icon: FileSearch,
          title: "Talep",
          copy: "İhtiyacınız olan ürün grupları, adetler, teslimat noktası ve özel koşullar netleştirilir.",
        },
        {
          icon: Target,
          title: "Teklif",
          copy: "Kurumunuza özel fiyat, ürün alternatifi ve teslimat planı içeren teklif hazırlanır.",
        },
        {
          icon: Network,
          title: "Tedarik",
          copy: "Onaylanan ürünler güvenilir kaynaklardan temin edilir ve süreç tek merkezden koordine edilir.",
        },
        {
          icon: Truck,
          title: "Teslimat",
          copy: "Siparişiniz planlanan takvime göre teslim edilir; eksiksiz teslim ve süreç takibi sağlanır.",
        },
      ],
    },
    quoteChecklist: {
      title: "Teklif için hangi bilgiler yeterli?",
      copy: "Detaylar net değilse bile kısa bir ihtiyaç özetiyle başlayabiliriz. Aşağıdaki bilgiler teklif hazırlığını hızlandırır.",
      items: [
        "Ürün grubu veya örnek ürün listesi",
        "Yaklaşık adet, koli veya dönemsel tüketim bilgisi",
        "Teslimat lokasyonu ve tercih edilen tarih aralığı",
        "Marka, kalite, belge veya özel ambalaj beklentisi",
      ],
    },
    principles: {
      title: "Kurumsal tedarikte güven, hız ve takip disiplini",
      copy:
        "İlk sürümde referans veya marka logoları yerine, kurumların tedarik ortağından beklediği temel çalışma disiplinlerini öne çıkarıyoruz.",
      items: [
        {
          icon: Handshake,
          title: "Tek muhatap",
          copy: "Çok kalemli ihtiyaçlarda farklı tedarikçilerle ayrı ayrı uğraşmadan süreci tek iletişim noktasıyla yönetirsiniz.",
        },
        {
          icon: BarChart3,
          title: "Şeffaf teklif",
          copy: "Ürün kapsamı, fiyat, teslimat ve alternatifler kurumsal karar almayı kolaylaştıracak açıklıkta sunulur.",
        },
        {
          icon: CheckCircle2,
          title: "Zamanında teslimat",
          copy: "Siparişin tedarik ve teslimat adımları planlanır; teslimat süresi ve ürün durumu düzenli takip edilir.",
        },
      ],
    },
    faq: {
      label: "Sık sorulan sorular",
      title: "Sık sorulan sorular",
      copy: "Kurumsal tedarik sürecine başlamadan önce en çok merak edilen başlıkları kısa şekilde özetledik.",
      items: [
        {
          question: "Hangi kurumlara hizmet veriyorsunuz?",
          answer: "Kamu kurumları, belediyeler, özel şirketler, tesisler, ofisler, yemekhaneler ve toplu alım yapan işletmeler için tedarik desteği sağlanır.",
        },
        {
          question: "Ürün grupları neleri kapsıyor?",
          answer: "Temizlik ve hijyen ürünleri, gıda ve mutfak sarfları, ambalaj ve paketleme ürünleri, ofis-kırtasiye ürünleri ve proje bazlı özel ihtiyaçlar kapsama alınabilir.",
        },
        {
          question: "Kuruma özel fiyat teklifi hazırlanıyor mu?",
          answer: "Evet. Ürün adedi, teslimat noktası, süreklilik ihtiyacı ve kategori kapsamına göre kurumunuza özel teklif hazırlanır.",
        },
        {
          question: "Teslimatlar ne kadar sürede yapılır?",
          answer: "Stok, miktar ve lokasyona bağlı olarak teslimat takvimi teklif aşamasında netleştirilir. Düzenli veya toplu alımlarda planlı teslimat akışı oluşturulur.",
        },
      ],
    },
    contact: {
      label: "Teklif formu",
      title: "Kurumsal ihtiyacınız için teklif hazırlayalım.",
      copy:
        "Kısa formu doldurun; ürün gruplarınızı, miktarınızı ve teslimat ihtiyacınızı netleştirerek size uygun teklif akışını hazırlayalım.",
      name: "Ad Soyad",
      company: "Kurum / Şirket",
      contact: "E-posta",
      message: "Talep özeti",
      submit: "Teklif talebi gönder",
      note: "Bu form şu an önizleme modundadır.",
      placeholders: {
        name: "Adınız ve soyadınız",
        company: "Kurum veya şirket adınız",
        contact: "ornek@firma.com",
        message: "İhtiyaç duyduğunuz ürün grupları, yaklaşık adetler ve teslimat lokasyonu",
      },
      details: [
        { icon: Mail, label: "E-posta", value: "info@optimalcozumler.com" },
      ],
    },
    footer: {
      copy: "Kamu ve özel kurumlar için pratik, ekonomik ve takip edilebilir tedarik çözümleri.",
      rights: "Tüm hakları saklıdır.",
    },
  },
  en: {
    nav: {
      services: "Services",
      process: "Process",
      principles: "Why Us",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Institutional supply and delivery solutions",
      title: "Source your organization's needs from one point, quickly and reliably.",
      copy:
        "Optimal Corporate Solutions manages product sourcing, quotation preparation, logistics follow-up, and delivery processes for public institutions, private companies, and organizations with bulk purchasing needs.",
      primary: "Request a quote",
      secondary: "Explore product groups",
      stats: [
        { value: "6", label: "Main product and service groups" },
        { value: "Planned", label: "Delivery and tracking flow" },
        { value: "One", label: "Contact for supply management" },
      ],
    },
    intro: {
      label: "Practical procurement support",
      title: "We simplify the flow from request to delivery on your behalf.",
      copy:
        "Institutional needs often become scattered across multiple suppliers, changing prices, and delivery follow-ups. We turn that process into a centralized, transparent, and timely supply flow.",
    },
    segments: {
      label: "Institution types",
      title: "Who we work for",
      copy: "We support organizations with regular consumable usage, multi-item purchasing, or project-based urgent supply needs.",
      items: [
        {
          icon: MapPinned,
          title: "Public institutions and municipalities",
          copy: "A structured supply flow is built for bulk purchases that require documentation, quotation, and delivery tracking.",
        },
        {
          icon: Boxes,
          title: "Offices, facilities, and businesses",
          copy: "Cleaning, stationery, packaging, and daily consumable needs are planned from one center.",
        },
        {
          icon: ShoppingBasket,
          title: "Cafeteria and event operations",
          copy: "Fast quotation and delivery coordination is provided for food, catering, kitchen consumables, and support products.",
        },
      ],
    },
    services: {
      title: "Product and service groups",
      copy:
        "From cleaning to office supplies, from food to packaging, we provide fast quotation and reliable sourcing support for regular and project-based institutional needs.",
      items: [
        {
          icon: ClipboardCheck,
          title: "Institutional supply management",
          copy: "Multi-item product needs of public and private sector organizations are managed in a planned, documented, and trackable way.",
        },
        {
          icon: Truck,
          title: "Logistics and delivery services",
          copy: "A delivery plan is created for approved orders, and timely, complete delivery is followed through.",
        },
        {
          icon: ShieldCheck,
          title: "Cleaning and hygiene products",
          copy: "Wholesale sourcing support is provided for cleaning, hygiene, consumable, and maintenance products used in institutional spaces.",
        },
        {
          icon: ShoppingBasket,
          title: "Food and kitchen consumables",
          copy: "Food, beverage, catering, and kitchen consumables are sourced for institutional kitchens, cafeterias, events, and operations.",
        },
        {
          icon: PackageCheck,
          title: "Packaging solutions",
          copy: "Boxes, bags, stretch film, tape, and packaging consumables are supplied for commercial and industrial use cases.",
        },
        {
          icon: Boxes,
          title: "Office and stationery products",
          copy: "Stationery, printer consumables, office materials, and support products are sourced economically for regular office needs.",
        },
      ],
    },
    supplyScope: {
      label: "Scope",
      title: "Supply scope",
      copy: "Instead of a catalog, we show clear scope cards that explain where supply support can be provided.",
      items: [
        "Cleaning chemicals, hygiene products, and consumables",
        "Food, beverages, catering, and kitchen consumption products",
        "Boxes, bags, stretch film, tape, and packaging products",
        "Stationery, printer consumables, and office support products",
        "Industrial consumables, maintenance, and facility support products",
        "Project-based product research and alternative sourcing",
      ],
    },
    benefits: {
      title: "Business impact",
      items: [
        "Creates a faster supply flow through one point of contact for different product groups.",
        "Makes quotation, approval, sourcing, and delivery stages more transparent.",
        "Helps manage price, timing, and quality balance in regular or bulk purchases.",
        "Reduces the purchasing and follow-up workload of operational teams.",
      ],
    },
    process: {
      title: "How it works",
      copy: "After receiving your request, we clarify the product scope, prepare the quote, and follow the sourcing and delivery process after approval.",
      steps: [
        {
          icon: FileSearch,
          title: "Request",
          copy: "Product groups, quantities, delivery point, and special conditions are clarified.",
        },
        {
          icon: Target,
          title: "Quote",
          copy: "A tailored offer is prepared with pricing, product alternatives, and delivery planning.",
        },
        {
          icon: Network,
          title: "Supply",
          copy: "Approved products are sourced from reliable channels and coordinated from one center.",
        },
        {
          icon: Truck,
          title: "Delivery",
          copy: "Your order is delivered according to the planned schedule with complete delivery and process tracking.",
        },
      ],
    },
    quoteChecklist: {
      title: "What is enough for a quote?",
      copy: "Even if the details are not fully clear, we can start with a short need summary. These points speed up quote preparation.",
      items: [
        "Product group or sample product list",
        "Approximate quantity, package count, or periodical consumption",
        "Delivery location and preferred date range",
        "Brand, quality, certificate, or packaging expectations",
      ],
    },
    principles: {
      title: "Trust, speed, and tracking discipline in institutional supply",
      copy:
        "For the first release, instead of using reference logos, we highlight the operating discipline institutions expect from a supply partner.",
      items: [
        {
          icon: Handshake,
          title: "One point of contact",
          copy: "For multi-item needs, you manage the process through one communication point instead of dealing with multiple suppliers separately.",
        },
        {
          icon: BarChart3,
          title: "Transparent quotation",
          copy: "Product scope, price, delivery, and alternatives are presented clearly enough to support institutional decision-making.",
        },
        {
          icon: CheckCircle2,
          title: "On-time delivery",
          copy: "Sourcing and delivery steps are planned, while delivery timing and product status are followed regularly.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Frequently asked questions",
      copy: "We summarized the common questions institutions ask before starting a supply process.",
      items: [
        {
          question: "Which organizations do you serve?",
          answer: "Supply support can be provided for public institutions, municipalities, private companies, facilities, offices, cafeterias, and businesses with bulk purchasing needs.",
        },
        {
          question: "Which product groups are covered?",
          answer: "Cleaning and hygiene products, food and kitchen consumables, packaging products, office and stationery products, and project-based special needs can be included.",
        },
        {
          question: "Do you prepare institution-specific quotes?",
          answer: "Yes. A tailored quote is prepared according to quantity, delivery point, continuity needs, and category scope.",
        },
        {
          question: "How quickly are deliveries completed?",
          answer: "The delivery schedule is clarified during the quotation stage depending on stock, quantity, and location. Regular or bulk purchases can be planned as scheduled deliveries.",
        },
      ],
    },
    contact: {
      label: "Quote form",
      title: "Let us prepare a quote for your institutional need.",
      copy:
        "Complete the short form so we can clarify your product groups, quantities, and delivery needs, then prepare the right quotation flow.",
      name: "Full name",
      company: "Institution / Company",
      contact: "Email",
      message: "Request summary",
      submit: "Send quote request",
      note: "This form is currently in preview mode.",
      placeholders: {
        name: "Your full name",
        company: "Institution or company name",
        contact: "name@company.com",
        message: "Needed product groups, approximate quantities, and delivery location",
      },
      details: [
        { icon: Mail, label: "Email", value: "info@optimalcozumler.com" },
      ],
    },
    footer: {
      copy: "Practical, economical, and trackable supply solutions for public and private institutions.",
      rights: "All rights reserved.",
    },
  },
};
