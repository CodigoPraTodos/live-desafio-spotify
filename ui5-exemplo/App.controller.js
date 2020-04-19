const token = "SPOTIFY-ACCESS-TOKEN";
const url = "https://api.spotify.com/v1/search?q=emi&type=artist";

sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("Quickstart.App", {
      onInit: async function () {
        const resposta = await fetch(url, {
          headers: { authorization: `Bearer ${token}` },
        });
        console.info("resposta >>> ", resposta);
        const dadosJson = await resposta.json();
        console.info("json >>> ", dadosJson);
        const artists = dadosJson.artists.items.map((i) => i.name);

        this.getView().setModel(new JSONModel({ artists }));
      },

      onChange: function (oEvent) {
        var bState = oEvent.getParameter("state");
        this.byId("ready").setVisible(bState);
      },
    });
  }
);
