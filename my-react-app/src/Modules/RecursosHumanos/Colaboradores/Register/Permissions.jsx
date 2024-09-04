import { useEffect, useState } from "react";
import FormMultiple from "./FormMultiple";
import ButtonOk from "../../../../recicle/Buttons";

const Permissions = ({ setForm2, resetForm }) => {
  const [formInstances, setFormInstances] = useState([{ id: 1 }]);
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    if (formDataList.length > 0) {
      setForm2(formDataList);
    }
  }, [formDataList, setForm2]);

  const updateFormData = (id, newData) => {
    setFormDataList((prevData) => {
      const updatedData = prevData.filter((data) => data.id !== id);
      return [...updatedData, { ...newData, id }];
    });
  };

  const addFormInstance = () => {
    setFormInstances((prevInstances) => [...prevInstances, { id: Date.now() }]);
  };

  const removeFormInstance = (id) => {
    setFormInstances((prevInstances) =>
      prevInstances.filter((instance) => instance.id !== id)
    );
    setFormDataList((prevData) => prevData.filter((data) => data.id !== id));
  };
  useEffect(() => {
    if (resetForm) {
      setFormInstances([{ id: 1 }]);
      setFormDataList([]);
    }
  }, [resetForm]);

  return (
    <div className="overflow-y-auto flex px-12 pt-4 pb-10 content-center items-start">
      <ButtonOk
        type="ok"
        children="+"
        styles="mt-10 px-8 mx-4"
        onClick={addFormInstance}
      />
      <div>
        {formInstances.map((instance) => (
          <div key={instance.id} className="flex content-center items-end">
            <FormMultiple
              resetForm={resetForm}
              set={(data) => updateFormData(instance.id, data)}
            />
            <ButtonOk
              styles="m-0 my-2 mx-2 px-2"
              children="Cancelar"
              onClick={() => removeFormInstance(instance.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Permissions;
