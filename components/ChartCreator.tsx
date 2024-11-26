import React, { useState } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ChartType = 'line' | 'bar' | 'pie';

interface DataPoint {
    name: string;
    value: number;
    value2: number;
}

interface PieDataPoint {
    name: string;
    value: number;
}

interface ChartCreatorProps {
    initialChartType?: ChartType;
    data?: DataPoint[];
}

const ChartCreator: React.FC<ChartCreatorProps> = ({
    initialChartType = 'line',
    data = [
        { name: 'Jan', value: 400, value2: 240 },
        { name: 'Feb', value: 300, value2: 139 },
        { name: 'Mar', value: 200, value2: 980 },
        { name: 'Apr', value: 278, value2: 390 },
        { name: 'May', value: 189, value2: 480 },
    ]
}) => {
    const [chartType, setChartType] = useState<ChartType>(initialChartType);

    const pieData: PieDataPoint[] = data.map(item => ({
        name: item.name,
        value: item.value
    }));

    const renderChart = (): JSX.Element | null => {
        switch (chartType) {
            case 'line':
                return (
                    <LineChart data={data} className="w-full h-64">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="value2"
                            stroke="#82ca9d"
                            strokeWidth={2}
                        />
                    </LineChart>
                );
            case 'bar':
                return (
                    <BarChart data={data} className="w-full h-64">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                        <Bar dataKey="value2" fill="#82ca9d" />
                    </BarChart>
                );
            case 'pie':
                return (
                    <PieChart className="w-full h-64">
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Chart Creator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                    <label className="font-medium">Chart Type:</label>
                    <Select value={chartType} onValueChange={(value: ChartType) => setChartType(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select chart type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="pie">Pie Chart</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="border rounded-lg p-4 bg-white">
                    <ResponsiveContainer width="100%" height={400}>
                        {renderChart()}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default ChartCreator;