import React, { useState } from "react";
import { Button } from "@strapi/design-system/Button";
import { Select, Option } from "@strapi/design-system/Select";
import { request } from "@strapi/helper-plugin";

const MoveButton = ({ requestId, oldCollection }) => {
  const [newCollection, setNewCollection] = useState("");

  const moveRequest = async () => {
    if (!newCollection) return alert("Выберите новый отдел!");

    try {
      await request("/requests/move", {
        method: "POST",
        body: { oldCollection, requestId, newCollection },
      });
      alert("Заявка перемещена!");
      window.location.reload();
    } catch (error) {
      alert("Ошибка при перемещении заявки");
    }
  };

  return (
    <>
      <Select
        value={newCollection}
        onChange={setNewCollection}
        label="Выберите новый отдел"
      >
        <Option value="saids">Саиды</Option>
        <Option value="bahadors">Бахадуры</Option>
        <Option value="kuats">Куаты</Option>
      </Select>
      <Button onClick={moveRequest}>Переместить заявку</Button>
    </>
  );
};

export default MoveButton;
