import React from "react";
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, 
    Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

function TrendsChart({ data }) {
    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <h3 className="card-title text-center mb-4">📈 Weekly Activity Trends</h3>
                {data.length > 0 ? (
                    <div style={{ height: '400px', width: '100%' }}>
                        <ResponsiveContainer>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="count" 
                                    stroke="#8884d8" 
                                    strokeWidth={3}
                                    name="Activities" 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <h5 className="text-muted">No trend data available</h5>
                        <p className="text-muted">Select a teacher to see weekly trends</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrendsChart
