import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Background, Form, FormButton } from "./NewCustomer";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function NewOrder(props) {
  const { token, setToken } = useContext(UserContext);
  const { setNewOrderForm } = props;
  const [customerId, setCustomerId] = useState(0);
  const [delivererId, setDelivererId] = useState(0);
  const [description, setDescription] = useState("");
  const [deliverers, setDeliverers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState("");
  const navigate = useNavigate();
  const setLoading = props.setLoading;

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
      console.log(token);
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        let customersArr = response.data;
        customersArr = customersArr.map((customer) => {
          return {
            value: customer.id,
            label: customer.name,
          };
        });
        setCustomers(customersArr);
        console.log(customersArr);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        setToken("");
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/deliverers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        let deliverersArr = response.data;
        deliverersArr = deliverersArr.map((deliverer) => {
          return {
            value: deliverer.id,
            label: deliverer.name,
          };
        });
        setDeliverers(deliverersArr);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        setToken("");
      });
  }, [token, navigate, setToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/orders`,
        {
          customerId,
          delivererId,
          description,
          total: `${total}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setNewOrderForm(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Background onClick={() => setNewOrderForm(false)} />
      <Form onSubmit={handleSubmit}>
        <ion-icon
          name="close-outline"
          onClick={() => setNewOrderForm(false)}
        ></ion-icon>
        <h1>Novo pedido</h1>
        <Select
          options={customers}
          onChange={(e) => {
            setCustomerId(e.value);
          }}
          placeholder="Cliente"
          required
        />
        <Select
          options={deliverers}
          onChange={(e) => {
            setDelivererId(e.value);
          }}
          placeholder="Selecione o entregador"
          style={{
            width: "90%",
            height: "40px",
            marginBottom: "10px",
            padding: "0 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          required
        ></input>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          placeholder="Total"
          required
        ></input>
        <FormButton>Enviar</FormButton>
      </Form>
    </>
  );
}
