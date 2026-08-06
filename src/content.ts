import {
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Handshake,
  Mail,
  MapPinned,
  MonitorCog,
  Network,
  PackageCheck,
  ShieldCheck,
  ShoppingBasket,
  Target,
  Truck,
  Zap,
} from "lucide-react";
import cleaningHygieneImage from "./assets/services/cleaning-hygiene.webp";
import constructionMaterialsImage from "./assets/services/construction-materials.webp";
import electricalSuppliesImage from "./assets/services/electrical-supplies.webp";
import foodKitchenImage from "./assets/services/food-kitchen.webp";
import itTechnologyImage from "./assets/services/it-technology.webp";
import logisticsDeliveryImage from "./assets/services/logistics-delivery.webp";
import officeStationeryImage from "./assets/services/office-stationery.webp";
import packagingImage from "./assets/services/packaging.webp";
import procurementManagementImage from "./assets/services/procurement-management.webp";
import adaletBakanligiLogo from "./assets/references/adalet-bakanligi.jpg";
import adliTipKurumuLogo from "./assets/references/adli-tip-kurumu.png";
import bigChefsLogo from "./assets/references/bigchefs.png";
import hatayBuyuksehirBelediyesiLogo from "./assets/references/hatay-buyuksehir-belediyesi.png";
import istanbulCumhuriyetBassavciligiLogo from "./assets/references/istanbul-cumhuriyet-bassavciligi.png";
import pasifikGyoLogo from "./assets/references/pasifik-gyo.svg";
import trakyaUniversitesiLogo from "./assets/references/trakya-universitesi.png";

export type Language = "tr" | "en";

export const languages: Record<Language, string> = {
  tr: "TR",
  en: "EN",
};

export const referenceLogos = [
  { name: "Adalet Bakanlığı", logo: adaletBakanligiLogo, alt: "Adalet Bakanlığı logosu", scaleClass: "is-seal" },
  { name: "Adli Tıp Kurumu", logo: adliTipKurumuLogo, alt: "Adli Tıp Kurumu logosu", scaleClass: "is-horizontal" },
  { name: "İstanbul Cumhuriyet Başsavcılığı", logo: istanbulCumhuriyetBassavciligiLogo, alt: "İstanbul Cumhuriyet Başsavcılığı logosu", scaleClass: "is-seal" },
  { name: "Pasifik GYO", logo: pasifikGyoLogo, alt: "Pasifik GYO logosu", scaleClass: "is-horizontal" },
  { name: "BigChefs", logo: bigChefsLogo, alt: "BigChefs logosu", scaleClass: "is-brand" },
  { name: "Trakya Üniversitesi", logo: trakyaUniversitesiLogo, alt: "Trakya Üniversitesi logosu", scaleClass: "is-university" },
  { name: "Hatay Büyükşehir Belediyesi", logo: hatayBuyuksehirBelediyesiLogo, alt: "Hatay Büyükşehir Belediyesi logosu", scaleClass: "is-horizontal is-reverse" },
] as const;

export const content = {
  tr: {
    nav: {
      services: "Hizmetler",
      references: "Referanslar",
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
        { target: 9, label: "Ana ürün ve hizmet grubu" },
        { target: 40, suffix: "+", label: "Hizmet verilen kurum" },
        { target: 250, suffix: "+", label: "Tamamlanan tedarik çözümü" },
      ],
    },
    segments: {
      label: "Kurum tipleri",
      title: "Kimler için çalışıyoruz?",
      copy: "Düzenli sarf tüketimi olan, çok kalemli alım yapan veya proje bazlı hızlı tedarik ihtiyacı duyan kurumlara operasyonel destek veririz.",
      items: [
        {
          icon: MapPinned,
          title: "Kamu Kurumları ve Belediyeler",
          copy: "Belge, teklif ve teslimat takibi gerektiren toplu ürün alımlarında düzenli tedarik akışı kurulur.",
        },
        {
          icon: Boxes,
          title: "Ofisler, Tesisler ve İşletmeler",
          copy: "Temizlik, kırtasiye, ambalaj ve günlük sarf ihtiyaçları tek merkezden planlanır.",
        },
        {
          icon: ShoppingBasket,
          title: "Yemekhane ve Etkinlik Operasyonları",
          copy: "Gıda, ikram, mutfak sarfı ve destek ürünleri için hızlı teklif ve teslimat koordinasyonu sağlanır.",
        },
      ],
    },
    references: {
      label: "Referanslarımız",
      title: "Farklı sektörlerde güvene dayalı tedarik ilişkileri.",
      items: referenceLogos,
    },
    services: {
      title: "Ürün ve hizmet grupları",
      copy:
        "Günlük sarf ihtiyaçlarından inşaat, elektrik ve bilişim ürünlerine kadar düzenli ve proje bazlı talepler için güvenilir tedarik desteği sağlanır.",
      detailLabels: {
        open: "Detayı gör",
        close: "Detayı kapat",
        file: "Hizmet dosyası",
        coverage: "Kapsama örnekleri",
        approach: "Nasıl destek oluyoruz?",
        cta: "Bu hizmet için teklif iste",
        imageCaption: "Temsili operasyon görseli",
      },
      items: [
        {
          id: "procurement-management",
          icon: ClipboardCheck,
          title: "Kurumsal Tedarik Yönetimi",
          copy: "Kamu ve özel sektör kurumlarının çok kalemli ürün ihtiyaçları planlı, belgeli ve takip edilebilir şekilde yönetilir.",
          image: procurementManagementImage,
          imageAlt: "Depoda ürün ve stok planlamasını tablet üzerinden değerlendiren iki çalışan",
          coverage: [
            "Çok kalemli ihtiyaç listelerinin tek talepte birleştirilmesi",
            "Ürün, marka ve teknik özellik alternatiflerinin karşılaştırılması",
            "Teklif, onay ve teslimat adımlarının kayıtlı takibi",
          ],
          approach: "Talep listenizi kategori, miktar ve teslimat önceliğine göre düzenler; uygun tedarik seçeneklerini tek teklif akışında karşılaştırılabilir biçimde sunarız.",
        },
        {
          id: "logistics-delivery",
          icon: Truck,
          title: "Lojistik ve Teslimat Hizmetleri",
          copy: "Onaylanan siparişler için teslimat planı oluşturulur; ürünlerin zamanında ve eksiksiz ulaşması takip edilir.",
          image: logisticsDeliveryImage,
          imageAlt: "Depo rafları arasında kutu taşıyan iki lojistik çalışanı",
          coverage: [
            "Siparişlerin teslimat noktası ve takvime göre gruplanması",
            "Parçalı veya toplu sevkiyat seçeneklerinin planlanması",
            "Teslim öncesi durum ve eksik kalem kontrolü",
          ],
          approach: "Onaylanan ürünleri çıkış ve teslimat planına bağlar; sevkiyat durumunu tek noktadan izleyerek kurumunuza düzenli bilgi veririz.",
        },
        {
          id: "cleaning-hygiene",
          icon: ShieldCheck,
          title: "Temizlik ve Hijyen Ürünleri",
          copy: "Kurumsal alanlarda kullanılan temizlik, hijyen, sarf ve bakım ürünleri için toptan tedarik desteği sunulur.",
          image: cleaningHygieneImage,
          imageAlt: "Sarı koruyucu eldivenlerle tutulan temizlik spreyi ve sünger",
          coverage: [
            "Genel alan, mutfak ve yüzey temizlik kimyasalları",
            "Kâğıt ürünleri, çöp torbaları ve hijyen sarfları",
            "Eldiven, bez, sünger ve profesyonel temizlik ekipmanları",
          ],
          approach: "Kullanım alanı, tüketim sıklığı ve ambalaj hacmine göre ürünleri eşleştirir; düzenli tüketilen kalemler için ekonomik toplu alım seçenekleri oluştururuz.",
        },
        {
          id: "food-kitchen",
          icon: ShoppingBasket,
          title: "Gıda ve Mutfak Sarf Ürünleri",
          copy: "Kurum mutfakları, yemekhaneler, etkinlikler ve operasyonel tüketimler için gıda ve ikram ürünleri temin edilir.",
          image: foodKitchenImage,
          imageAlt: "Profesyonel bir mutfakta hazırlık yapan aşçı ve mutfak ekipmanları",
          coverage: [
            "Kuru gıda, içecek ve toplu tüketim ürünleri",
            "Tek kullanımlık servis ve ikram malzemeleri",
            "Mutfak hazırlık, saklama ve günlük tüketim sarfları",
          ],
          approach: "Tüketim miktarı, teslim sıklığı ve saklama koşullarını dikkate alarak mutfak operasyonunu aksatmayacak ürün ve teslimat planı hazırlarız.",
        },
        {
          id: "packaging",
          icon: PackageCheck,
          title: "Ambalaj ve Paketleme Çözümleri",
          copy: "Koli, poşet, streç, bant ve paketleme sarflarında ticari ve endüstriyel kullanıma uygun seçenekler sunulur.",
          image: packagingImage,
          imageAlt: "Bir koliyi bant makinesiyle kapatan paketleme çalışanının elleri",
          coverage: [
            "Koli, kutu ve ürüne uygun koruyucu ambalajlar",
            "Streç film, bant, poşet ve dolgu malzemeleri",
            "Sevkiyat, depolama ve etiketleme sarfları",
          ],
          approach: "Paketlenecek ürünün ölçüsü, ağırlığı ve sevkiyat koşullarına göre doğru malzeme kombinasyonunu belirler; gereksiz sarf kullanımını azaltacak alternatifler sunarız.",
        },
        {
          id: "office-stationery",
          icon: Boxes,
          title: "Ofis ve Kırtasiye Ürünleri",
          copy: "Ofislerin düzenli ihtiyaç duyduğu kırtasiye, yazıcı sarf, büro malzemeleri ve destek ürünleri ekonomik şekilde tedarik edilir.",
          image: officeStationeryImage,
          imageAlt: "Masa üzerinde düzenlenmiş defter, kalem, cetvel ve ofis sarf malzemeleri",
          coverage: [
            "Kâğıt, dosyalama ve masaüstü kırtasiye ürünleri",
            "Yazıcı tonerleri, kartuşlar ve baskı sarfları",
            "Arşivleme, toplantı ve günlük ofis destek ürünleri",
          ],
          approach: "Departmanların tekrar eden ihtiyaçlarını ortak listede toplar; uyumlu sarf ürünlerini ve ekonomik muadilleri teslimat periyoduna göre planlarız.",
        },
        {
          id: "construction-materials",
          icon: Building2,
          title: "İnşaat ve Yapı Malzemeleri",
          copy: "Tadilat, bakım ve proje ihtiyaçları için yapı malzemeleri, hırdavat, boya, yalıtım ve tamamlayıcı ürünlerin tedariği koordine edilir.",
          image: constructionMaterialsImage,
          imageAlt: "Tadilat alanında yapı malzemeleri, boya kovaları ve uygulama ekipmanları",
          coverage: [
            "Hırdavat, bağlantı elemanları ve el aletleri",
            "Boya, yalıtım ve yüzey uygulama malzemeleri",
            "Bakım, tadilat ve proje bazlı tamamlayıcı ürünler",
          ],
          approach: "Malzeme listesini uygulama alanı ve teknik şartlara göre netleştirir; farklı kalemlerin proje takvimine uygun biçimde birlikte sevk edilmesini koordine ederiz.",
        },
        {
          id: "electrical-supplies",
          icon: Zap,
          title: "Elektrik Malzemeleri",
          copy: "Kablo, aydınlatma, pano ekipmanları, anahtar-priz grupları ve tesisat sarfları proje şartlarına uygun seçeneklerle temin edilir.",
          image: electricalSuppliesImage,
          imageAlt: "Elektrik panosundaki bağlantıları ölçüm cihazıyla kontrol eden teknisyen",
          coverage: [
            "Kablo, kanal, bağlantı ve tesisat sarfları",
            "Aydınlatma, anahtar, priz ve kontrol ekipmanları",
            "Pano bileşenleri ve proje bazlı elektrik malzemeleri",
          ],
          approach: "Teknik liste, kullanım ortamı ve proje standardına göre uyumlu ürünleri araştırır; onay öncesinde alternatiflerin temel özelliklerini karşılaştırırız.",
        },
        {
          id: "it-technology",
          icon: MonitorCog,
          title: "Bilişim ve Teknoloji Ürünleri",
          copy: "Bilgisayar, çevre birimleri, ağ ekipmanları, yazıcı ve kurumsal teknoloji ihtiyaçları için ürün araştırması ve tedarik desteği sunulur.",
          image: itTechnologyImage,
          imageAlt: "Veri merkezindeki ağ cihazlarına bağlı düzenli veri kabloları",
          coverage: [
            "Bilgisayar, monitör ve kullanıcı çevre birimleri",
            "Ağ cihazları, kablolama ve bağlantı ekipmanları",
            "Yazıcı, depolama ve kurumsal teknoloji sarfları",
          ],
          approach: "Kullanım senaryosu, bağlantı uyumluluğu ve bütçe aralığını netleştirir; kurum standardına uygun güncel ürün seçeneklerini karşılaştırmalı olarak sunarız.",
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
        "İnşaat, hırdavat, boya, yalıtım ve yapı malzemeleri",
        "Elektrik tesisatı, aydınlatma, kablo ve pano ekipmanları",
        "Bilgisayar, çevre birimleri, ağ ve bilişim ürünleri",
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
      sending: "Gönderiliyor...",
      success: "Teklif talebiniz başarıyla gönderildi.",
      error: "Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.",
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
    location: {
      label: "Ofis konumu",
      title: "Bizi ziyaret edin",
      address: "Y Ofis, Merkez Mah., Kağıthane Cd. No:7, 34406 Kağıthane / İstanbul",
      directions: "Yol tarifi al",
      mapTitle: "Y Ofis konumunu gösteren Google Maps haritası",
    },
    footer: {
      copy: "Kamu ve özel kurumlar için pratik, ekonomik ve takip edilebilir tedarik çözümleri.",
      rights: "Tüm hakları saklıdır.",
    },
  },
  en: {
    nav: {
      services: "Services",
      references: "References",
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
        { target: 9, label: "Main product and service groups" },
        { target: 40, suffix: "+", label: "Organizations served" },
        { target: 250, suffix: "+", label: "Completed supply solutions" },
      ],
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
    references: {
      label: "References",
      title: "Trusted supply relationships across different sectors.",
      items: referenceLogos,
    },
    services: {
      title: "Product and service groups",
      copy:
        "From daily consumables to construction, electrical, and IT products, we provide reliable sourcing support for regular and project-based institutional needs.",
      detailLabels: {
        open: "View details",
        close: "Close details",
        file: "Service file",
        coverage: "Example coverage",
        approach: "How we support you",
        cta: "Request a quote for this service",
        imageCaption: "Representative operations image",
      },
      items: [
        {
          id: "procurement-management",
          icon: ClipboardCheck,
          title: "Institutional supply management",
          copy: "Multi-item product needs of public and private sector organizations are managed in a planned, documented, and trackable way.",
          image: procurementManagementImage,
          imageAlt: "Two warehouse employees reviewing product and inventory planning on a tablet",
          coverage: [
            "Consolidating multi-item requirement lists into one request",
            "Comparing product, brand, and technical specification alternatives",
            "Documented tracking of quotation, approval, and delivery steps",
          ],
          approach: "We organize your request by category, quantity, and delivery priority, then present suitable sourcing options in one clear and comparable quotation flow.",
        },
        {
          id: "logistics-delivery",
          icon: Truck,
          title: "Logistics and delivery services",
          copy: "A delivery plan is created for approved orders, and timely, complete delivery is followed through.",
          image: logisticsDeliveryImage,
          imageAlt: "Two logistics employees carrying boxes through warehouse aisles",
          coverage: [
            "Grouping orders by delivery point and schedule",
            "Planning consolidated or partial shipment options",
            "Pre-delivery status and missing-item checks",
          ],
          approach: "We connect approved products to a dispatch and delivery plan, monitor shipment status from one point, and keep your organization regularly informed.",
        },
        {
          id: "cleaning-hygiene",
          icon: ShieldCheck,
          title: "Cleaning and hygiene products",
          copy: "Wholesale sourcing support is provided for cleaning, hygiene, consumable, and maintenance products used in institutional spaces.",
          image: cleaningHygieneImage,
          imageAlt: "Cleaning spray and sponge held with yellow protective gloves",
          coverage: [
            "General-area, kitchen, and surface cleaning chemicals",
            "Paper products, waste bags, and hygiene consumables",
            "Gloves, cloths, sponges, and professional cleaning tools",
          ],
          approach: "We match products to the area of use, consumption frequency, and pack size, then create economical bulk-purchase options for regularly used items.",
        },
        {
          id: "food-kitchen",
          icon: ShoppingBasket,
          title: "Food and kitchen consumables",
          copy: "Food, beverage, catering, and kitchen consumables are sourced for institutional kitchens, cafeterias, events, and operations.",
          image: foodKitchenImage,
          imageAlt: "Chef preparing food among equipment in a professional kitchen",
          coverage: [
            "Dry food, beverages, and bulk-consumption products",
            "Disposable service and catering supplies",
            "Kitchen preparation, storage, and daily-use consumables",
          ],
          approach: "We consider consumption volume, delivery frequency, and storage conditions to prepare a product and delivery plan that keeps kitchen operations running.",
        },
        {
          id: "packaging",
          icon: PackageCheck,
          title: "Packaging solutions",
          copy: "Boxes, bags, stretch film, tape, and packaging consumables are supplied for commercial and industrial use cases.",
          image: packagingImage,
          imageAlt: "Packaging worker sealing a cardboard box with a tape dispenser",
          coverage: [
            "Cartons, boxes, and product-specific protective packaging",
            "Stretch film, tape, bags, and void-fill materials",
            "Shipping, storage, and labeling consumables",
          ],
          approach: "We identify the right material combination for product dimensions, weight, and shipping conditions, with alternatives that help reduce unnecessary consumption.",
        },
        {
          id: "office-stationery",
          icon: Boxes,
          title: "Office and stationery products",
          copy: "Stationery, printer consumables, office materials, and support products are sourced economically for regular office needs.",
          image: officeStationeryImage,
          imageAlt: "Notebooks, pens, ruler, and office consumables arranged on a desk",
          coverage: [
            "Paper, filing, and desktop stationery products",
            "Printer toners, cartridges, and printing consumables",
            "Archiving, meeting, and daily office support items",
          ],
          approach: "We consolidate recurring departmental needs, then plan compatible consumables and economical alternatives according to the preferred delivery cycle.",
        },
        {
          id: "construction-materials",
          icon: Building2,
          title: "Construction and building materials",
          copy: "Building materials, hardware, paint, insulation, and complementary products are coordinated for renovation, maintenance, and project needs.",
          image: constructionMaterialsImage,
          imageAlt: "Building materials, paint containers, and application equipment at a renovation site",
          coverage: [
            "Hardware, fasteners, and hand tools",
            "Paint, insulation, and surface-application materials",
            "Complementary products for maintenance, renovation, and projects",
          ],
          approach: "We clarify the material list against application and technical requirements, then coordinate combined delivery of different items in line with the project schedule.",
        },
        {
          id: "electrical-supplies",
          icon: Zap,
          title: "Electrical supplies",
          copy: "Cables, lighting, panel equipment, switches, sockets, and installation consumables are sourced to match project requirements.",
          image: electricalSuppliesImage,
          imageAlt: "Technician testing connections inside an electrical panel with a multimeter",
          coverage: [
            "Cable, conduit, connection, and installation consumables",
            "Lighting, switches, sockets, and control equipment",
            "Panel components and project-based electrical materials",
          ],
          approach: "We research compatible products according to the technical list, operating environment, and project standard, then compare key alternatives before approval.",
        },
        {
          id: "it-technology",
          icon: MonitorCog,
          title: "IT and technology products",
          copy: "Product research and sourcing support is provided for computers, peripherals, network equipment, printers, and institutional technology needs.",
          image: itTechnologyImage,
          imageAlt: "Organized data cables connected to network equipment in a data center",
          coverage: [
            "Computers, monitors, and user peripherals",
            "Network devices, cabling, and connectivity equipment",
            "Printers, storage, and institutional technology consumables",
          ],
          approach: "We clarify the use case, connection compatibility, and budget range, then present current product options that align with your organization’s standards.",
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
        "Construction materials, hardware, paint, and insulation products",
        "Electrical installation, lighting, cable, and panel equipment",
        "Computers, peripherals, network, and IT products",
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
      sending: "Sending...",
      success: "Your quote request has been sent successfully.",
      error: "Your quote request could not be sent. Please try again.",
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
    location: {
      label: "Office location",
      title: "Visit our office",
      address: "Y Ofis, Merkez Quarter, Kağıthane Avenue No:7, 34406 Kağıthane / Istanbul",
      directions: "Get directions",
      mapTitle: "Google Maps showing the Y Ofis location",
    },
    footer: {
      copy: "Practical, economical, and trackable supply solutions for public and private institutions.",
      rights: "All rights reserved.",
    },
  },
};
