
const visionTexts = {
  "en": "MetaXuan Coin is a global decentralized asset committed to transparent charity and fair resource allocation. Inspired by the mantra ॐ मणि पद्मे हूं, we believe compassion and wisdom can uplift all beings.",
  "zh-TW": "玄元幣是一項全球性去中心化資產，致力於慈善透明與公平分配，以六字大明咒為靈感，用慈悲與智慧幫助眾生。",
  "zh-CN": "玄元币是一项全球性去中心化资产，致力于慈善透明与公平分配，以六字大明咒为灵感，用慈悲与智慧帮助众生。",
  "ja": "MetaXuan Coinは、慈善と公平な分配を目指すグローバルな分散型資産であり、「オン・マニ・パドメ・フン」の精神に基づいています。",
  "ko": "MetaXuan Coin은 자비와 지혜로 인류를 돕기 위해 탄생한 글로벌 분산형 자산입니다.",
  "es": "MetaXuan Coin es un activo descentralizado global inspirado en el mantra para promover la caridad y la equidad.",
  "th": "MetaXuan Coin เป็นสินทรัพย์แบบกระจายศูนย์ระดับโลก ใช้เมตตาและปัญญาในการช่วยเหลือผู้คน",
  "vi": "MetaXuan Coin là tài sản phi tập trung toàn cầu dựa trên lòng từ bi và trí tuệ để hỗ trợ cộng đồng.",
  "fr": "MetaXuan Coin est un actif décentralisé mondial qui œuvre pour la charité et l'équité, inspiré du mantra.",
  "de": "MetaXuan Coin ist ein globales dezentralisiertes Asset, das durch Mitgefühl und Weisheit inspiriert ist.",
  "hi": "MetaXuan Coin एक वैश्विक विकेंद्रीकृत संपत्ति है जो करुणा और बुद्धि से प्रेरित है।"
};

function toggleVision() {
  const container = document.getElementById("vision-content");
  const text = document.getElementById("vision-text");
  const lang = document.getElementById("language").value;
  text.textContent = visionTexts[lang] || visionTexts["en"];
  container.style.display = container.style.display === "none" ? "block" : "none";
}
