import React from "react";

function DashboardHeader() {
    return (
        <div className="card">
            <div className="col-12">
                <div className="card border-0 bg-gradient-primary text-white shadow-lg">
                    <div className="card-body text-center py-5">
                        <h1 className="display-4 fw-bold mb-3 text-dark">🧑‍🏫 Savra Insights</h1>
                        <h4 className="mb-0 text-dark">Teacher Performance Analytics Dashboard</h4>
                        <p className="lead mt-2 opacity-75">Real-time insights for school administrators</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader
