const { useState } = require("react");

export default function useFormData(initial) {
  const [formdata, setFormdata] = useState(initial);
  const updateFormData = (e) => {
    const { value, name } = e.target;
    setFormdata((d) => ({ ...d, [name]: value }));
  };

  return [formdata, updateFormData];
}
