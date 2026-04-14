import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import type { QuestionnaireData } from '../../types';

interface ChartProps {
    data: { data: QuestionnaireData }[];
}

export const CorrelationChart: React.FC<ChartProps> = ({ data }) => {
    // Calculate Average GPA by Faculty
    const facultyStats = data.reduce((acc: Record<string, { totalGpa: number, count: number }>, curr) => {
        const faculty = curr.data.faculty || 'Unknown';
        const gpa = parseFloat(curr.data.gpa);
        
        if (!acc[faculty]) {
            acc[faculty] = { totalGpa: 0, count: 0 };
        }
        
        if (!isNaN(gpa)) {
            acc[faculty].totalGpa += gpa;
            acc[faculty].count += 1;
        }
        
        return acc;
    }, {});

    const chartData = Object.keys(facultyStats).map(faculty => {
        const stats = facultyStats[faculty];
        return {
            name: faculty,
            avgGpa: stats.count > 0 ? Number((stats.totalGpa / stats.count).toFixed(2)) : 0
        };
    }).sort((a, b) => b.avgGpa - a.avgGpa); // Sort highest to lowest

    // Color palette for bars
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 30, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    domain={[0, 5]} // GPA scale
                />
                <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' 
                    }}
                    formatter={(value: any) => [`${value} GPA`, 'Average Score']}
                />
                <Bar dataKey="avgGpa" radius={[6, 6, 0, 0]}>
                    {chartData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                    <LabelList dataKey="avgGpa" position="top" fill="#4b5563" fontSize={11} fontWeight="bold" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
