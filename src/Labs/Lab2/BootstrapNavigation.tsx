import React from 'react';

const BootstrapNavigation: React.FC = () => {
  const handleTabClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("Tab clicked");
  };

  const handleCardButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("Card button clicked");
  };

  return (
    <div>
      <div id="wd-css-navigating-with-tabs">
        <h2>Tabs</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className="nav-link active" onClick={handleTabClick}>Active</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={handleTabClick}>Link</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={handleTabClick}>Link</button>
          </li>
          <li className="nav-item">
            <button className="nav-link disabled" disabled>Disabled</button>
          </li>
        </ul>
      </div>

      <div id="wd-css-navigating-with-cards">
        <h2>Cards</h2>
        <div className="card" style={{ width: "18rem" }}>
          <img src="images/stacked.jpg" className="card-img-top" alt="Stacking Starship" />
          <div className="card-body">
            <h5 className="card-title">Stacking Starship</h5>
            <p className="card-text">
              Stacking the most powerful rocket in history. Mars or bust!
            </p>
            <button className="btn btn-primary" onClick={handleCardButtonClick}>Boldly Go</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapNavigation;