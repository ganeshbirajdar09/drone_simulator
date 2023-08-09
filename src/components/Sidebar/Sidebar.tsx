import React from 'react';
import { SideBarProps } from './Sidebar.types';
import "./Sidebar.scss"


const SideBar: React.FC<SideBarProps> = ({ setTargetPosition, setDuration, simulate, resetSimulation }) => {
    return (
        <main className="sidebar-container">
            <section className="form main-section">
                <h2>Drone Simulation</h2>
                <form className="user-form" id="form" onSubmit={simulate}>
                    <div className="form-group">
                        <label htmlFor="name">Latitude</label>
                        <input
                            type="number"
                            placeholder="Target latitude"
                            onChange={(e) => setTargetPosition((prev) => ({ ...prev, latitude: parseFloat(e.target.value) }))}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Longitude</label>
                        <input

                            type="number"
                            placeholder="Target longitude"
                            onChange={(e) => setTargetPosition((prev) => ({ ...prev, longitude: parseFloat(e.target.value) }))}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Duration</label>
                        <input
                            type="number"
                            placeholder="enter duration (seconds)"
                            onChange={(e) => setDuration(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="form-group btn-container">
                        <button type="submit" className="btn" id="submit-btn">Simulate</button>
                    </div>
                    <div className="form-group btn-container">
                        <button type="reset" className="btn btn--delete" id="submit-btn" onClick={resetSimulation}>Reset</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default SideBar;
