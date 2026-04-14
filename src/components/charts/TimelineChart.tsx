import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineProps {
    data: { created_at: string }[];
}

export const TimelineChart: React.FC<TimelineProps> = ({ data }) => {
    // Group submissions by Date
    const groupedByDate = data.reduce((acc: Record<string, number>, curr) => {
        const dateString = new Date(curr.created_at).toLocaleDateString();
        if (!acc[dateString]) acc[dateString] = 0;
        acc[dateString] += 1;
        return acc;
    }, {});

    const chartData = Object.keys(groupedByDate).map(date => ({
        date,
        submissions: groupedByDate[date]
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                />
                <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                />
                <Tooltip 
                    contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' 
                    }}
                />
                <Line 
                    type="monotone" 
                    dataKey="submissions" 
                    name="Responses"
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
