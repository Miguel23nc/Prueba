import { useState } from "react";
import { useDispatch } from "react-redux";
import useref from "../../../../recicle/useRef";
import { useAuth } from "../../../../context/AuthContext";
import { getEmployees } from "../../../../redux/actions";
import Input from "../../../../recicle/Inputs";
import Directorio from "../List/Directorio";
import ButtonOk from "../../../../recicle/Buttons";

const Edit = (props) => {
  const { setShowEdit, client } = props;
  const { updateEmployee } = useAuth();
  const ref = useref(setShowEdit);
  const dispatch = useDispatch();
  const [edition, setEdition] = useState({
    ...client,
    phoneCode: "+51",
    password: "",
  });
  const handleChangeCode = (e) => {
    setEdition((prevData) => {
      return { ...prevData, phoneCode: e };
    });
  };
  const handleEdition = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setEdition((prevData) => ({
        ...prevData,
        [name]: value.toUpperCase(),
      }));
    } else {
      setEdition((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const getNonMatchingProperties = (obj1, obj2) => {
    return Object.fromEntries(
      Object.entries(obj1).filter(([key, value]) => obj2[key] !== value)
    );
  };
  const nonMatchingProperties = {
    ...getNonMatchingProperties(edition, client),
    _id: edition._id,
  };

  const upDate = async () => {
    try {
      const response = await updateEmployee(nonMatchingProperties);
      dispatch(getEmployees());
      console.log("Exito", response);
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  console.log(edition);
  return (
    <div
      ref={ref}
      className={`w-[70%]  h-[80%] pt-6 bg-white flex flex-col justify-center
         border-stone-500 border shadow-lg fixed top-20 z-40 rounded-xl`}
    >
      <div
        className="overflow-y-auto  px-6 content-center 
        flex-wrap ml-10 mx-6 h-[80%] "
      >
        <h1 className="">CLIENTE</h1>
        <div className="flex content-center border-2  border-black rounded-lg
        min-h-[55%] h-96 p-2 flex-wrap">
          <Input
            id="razonSocial"
            label="Razón Social"
            type="text"
            name="razonSocial"
            pattern="[a-zA-Z\s]*"
            onKeyPress={(e) => {
              if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            width={"w-80 ml-8"}
            onChange={handleEdition}
            value={edition.razonSocial}
          />
          <Input
            id="ruc"
            name="ruc"
            label="DNI"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={8}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={handleEdition}
            value={edition.ruc}
          />

          <Input
            id="email"
            name="email"
            label="Correo Electrónico"
            onChange={handleEdition}
            value={edition.email}
          />
          <Input
            name="phoneCode"
            id="phoneCode"
            width="w-32 ml-8"
            label="Pais"
            onChange={handleChangeCode}
            value={edition.phoneCode}
          />
          <Input
            label="Telefono"
            type="text"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            name="phoneNumber"
            value={edition.phoneNumber}
            onChange={handleEdition}
          />
          <Input
            id="password"
            name="password"
            label="Contraseña"
            onChange={handleEdition}
            value={edition.password}
          />
          <Input
            name="economicSector"
            id="economicSector"
            label="Sector Económico"
            onChange={handleEdition}
            value={edition.economicSector}
          />
          <Input
            name="contidition"
            id="contidition"
            label="Condición de Pago"
            onChange={handleEdition}
            value={edition.condition}
          />
        </div>
        <div className="min-h-[30%]   py-3 items-start">
          <h1>Directorio</h1>
          <Directorio directory={edition.directory} setEdition={setEdition} />
        </div>
      </div>

      <div className="flex justify-end p-3">
        <ButtonOk onClick={() => upDate()} type="ok" children="Editar" />
        <ButtonOk onClick={() => setShowEdit(false)} children="Cancelar" />
      </div>
    </div>
  );
};

export default Edit;
