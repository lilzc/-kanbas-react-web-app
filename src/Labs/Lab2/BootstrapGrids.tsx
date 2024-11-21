const ResponsiveGrids = () => {
    return (
      <div>
        <h2>Responsive Grid Systems</h2>
        
        {/* Simple Responsive Grid */}
        <div id="wd-bs-responsive-grids">
          <h3>Simple Responsive Grid</h3>
          <div className="row">
            <div className="col-12 col-md-6 col-xl-3 bg-warning">
              <h4>Column A</h4>
            </div>
            <div className="col-12 col-md-6 col-xl-3 bg-primary text-white">
              <h4>Column B</h4>
            </div>
            <div className="col-12 col-md-6 col-xl-3 bg-danger text-white">
              <h4>Column C</h4>
            </div>
            <div className="col-12 col-md-6 col-xl-3 bg-success text-white">
              <h4>Column D</h4>
            </div>
          </div>
        </div>
  
        {/* Complex Responsive Grid */}
        <div id="wd-bs-responsive-dramatic">
          <h3>Complex Responsive Grid</h3>
          <div className="row">
            {[...Array(12)].map((_, index) => (
              <div key={index} className={`col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1 
                ${['bg-warning', 'bg-primary', 'bg-danger', 'bg-success'][index % 4]} 
                ${index % 4 !== 0 ? 'text-white' : ''}`}>
                <h4>{index + 1}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ResponsiveGrids;