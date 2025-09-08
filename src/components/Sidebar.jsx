const categories = [
  "01 Certain infectious or parasitic diseases",
  "02 Neoplasms",
  "03 Diseases of the blood or blood-forming organs",
  "04 Diseases of the immune system",
  "05 Endocrine, nutritional or metabolic diseases",
  "06 Mental, behavioural or neurodevelopmental disorders",
  "07 Sleep-wake disorders",
  "08 Diseases of the nervous system",
  "09 Diseases of the visual system",
  "10 Diseases of the ear or mastoid process",
  "11 Diseases of the circulatory system",
  "12 Diseases of the respiratory system",
  "13 Diseases of the digestive system",
  "14 Diseases of the skin",
  "15 Diseases of the musculoskeletal system or connective tissue",
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>ICD-11 for Mortality and Morbidity Statistics</h2>
      <input type="text" placeholder="Type for starting the search" />
      <ul>
        {categories.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
