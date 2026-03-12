const newsItems = [
  "🌾 MSP बढ़ोतरी की माँग पर BKA का राष्ट्रव्यापी अभियान शुरू",
  "📢 किसान महापंचायत 15 अप्रैल को दिल्ली में आयोजित",
  "🏆 BKA को 'Best Farmer Welfare Organization 2025' पुरस्कार",
  "💧 सिंचाई सुधार योजना पर सरकार से वार्ता जारी",
  "🌱 जैविक खेती प्रशिक्षण कार्यक्रम — अगला बैच जल्द",
  "📋 50,000+ नए सदस्य इस माह जुड़े — आंदोलन मज़बूत हो रहा है",
];

const NewsTicker = () => {
  return (
    <div className="gradient-forest overflow-hidden py-2">
      <div className="ticker-track whitespace-nowrap">
        {[...newsItems, ...newsItems].map((item, i) => (
          <span
            key={i}
            className="inline-block px-8 text-sm font-medium text-primary-foreground md:text-base"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
