import React from "react";

function Menu({ profile, fazerLogout }) {
  if (!profile) {
    return "";
  }

  const image = profile.images.length ? profile.images[0].url : "";

  return (
    <div className="level-right">
      <div className="level-item">
        <div className="field has-addons">
          <p className="control">
            <input
              className="input"
              type="text"
              placeholder="pesquisar artista/música"
            />
          </p>
          <p className="control">
            <button className="button">Search</button>
          </p>
        </div>
      </div>
      <p className="level-item">
        <a href="#" onClick={fazerLogout}>
          Sair
        </a>
      </p>
      <p className="level-item">
        <img className="profile-img" src={image} alt={profile.display_name} />
      </p>
    </div>
  );
}

export default Menu;
