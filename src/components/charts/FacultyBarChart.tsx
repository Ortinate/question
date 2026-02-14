import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { QuestionnaireData } from '../../types';

interface ChartProps {
    data: { data: QuestionnaireData }[];
}

export const FacultyBarChart: React.FC<ChartProps> = ({ data }) => {
    // Process data to count students per faculty
    const facultyCounts: Record<string, number> = {};
    data.forEach(item => {
        const faculty = item.data.faculty || 'Unknown';
        facultyCounts[faculty] = (facultyCounts[faculty] || 0) + 1;
    });

    const chartData = Object.keys(facultyCounts).map(key => ({
        name: key,
        count: facultyCounts[key],
    })).sort((a, b) => b.count - a.count); // Sort by count descending

    const COLORS = ['#003366', '#FFD700', '#004d99', '#ffe44d', '#002244'];

    if (chartData.length === 0) {
        return <div className="text-center text-gray-500 py-10">No data available</div>;
    }

    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: '#f1f5f9' }}
                        contentStyle={{
                            borderRadius: '0.75rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            padding: '0.75rem'
                        }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={50}>
                        {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
