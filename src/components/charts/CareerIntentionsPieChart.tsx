import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { QuestionnaireData } from '../../types';

interface ChartProps {
    data: { data: QuestionnaireData }[];
}

export const CareerIntentionsPieChart: React.FC<ChartProps> = ({ data }) => {
    // Process data to count career goals
    const goalCounts: Record<string, number> = {};
    data.forEach(item => {
        // Simplify long labels for the chart key if needed, or keep full
        let goal = item.data.careerGoal || 'Undecided';
        if (goal.includes('Employment')) goal = 'Employment';
        else if (goal.includes('Self-employment')) goal = 'Business/Self';
        else if (goal.includes('Further studies')) goal = 'Further Studies';

        goalCounts[goal] = (goalCounts[goal] || 0) + 1;
    });

    const chartData = Object.keys(goalCounts).map(key => ({
        name: key,
        value: goalCounts[key],
    }));

    const COLORS = ['#003366', '#FFD700', '#E11D48', '#10B981', '#6366F1'];

    if (chartData.length === 0) {
        return <div className="text-center text-gray-500 py-10">No data available</div>;
    }

    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: '0.75rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            padding: '0.75rem'
                        }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
