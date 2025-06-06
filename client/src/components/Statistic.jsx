import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils/fetchData';
import React, {useState, useEffect,useMemo} from 'react';
import { useAuth } from '../context/auth'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Statistics() {
    const [stats, setStats] = useState([]);
    const [dataCount,setDataCount]=useState([]);
       const {auth} = useAuth();
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get(`${BASE_URL}/api/Admin`,
                    {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setStats(response.data.slice(0, 6));
                console.log(response.data);
                
            }
            const fetchAccount = async () => {
                const response = await axios.get(`${BASE_URL}/api/Users`,
                    {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setDataCount([
                    response.data?.filter(a=>a.role=='user').length,
                    response.data?.filter(a=>a.role=='staff').length,
                    response.data?.filter(a=>a.role=='trainer').length,
                ]);
                console.log(response.data);
                
            }

            fetchData();
            fetchAccount();
        } catch(error) {
            console.log(error);
            toast.error('Không thể tải dữ liệu thống kê');
        }
    }, []);

    const monthlyTrend = useMemo(() => {
        if(stats) {
            const labels = stats.map(item => `T${item.month}/${item.year}`);
            return {
                labels,
                datasets: [
                    {
                        label: 'Revenue($)',
                        data: stats.map(item => (item.totalAmount)),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        tension: 0.3
                    }
                ]
            }
        }
    }, [stats]);

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh thu 6 tháng gần nhất',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.raw  || 0;
                        
                        return `${label}: ${value}$`;
                    },
                    // afterLabel:function(context){
                    //     const value = context.dataIndex;
                    //     const totalOrders = stats[value]?.totalOrders||0;
                    //     return `Tổng đơn hàng : ${totalOrders}`;
                    // }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Revenue  ($)',
                },
                ticks: {
                    callback: function(value) {
                        const valuereal = value ;
                        return `${valuereal}$`;
                    }
                }
            }
        }
    };

    const countsComparisonData = useMemo(()=>({
        labels:['User','Staff','Trainer'],
        datasets: [
            {
                label: 'Số lượng tài khoản',
                data: dataCount,
                backgroundColor: ['#f1c40f', '#3498db', '#27ae60']
            }
        ]
    }),[dataCount])

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Số lượng người dùng theo vai trò',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Số lượng'
                },
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        if (Math.floor(value) === value) {
                            return value;
                        }
                    }
                }
            }
        }
    }

    // const revenueTypePay=useMemo(()=>{
    //     return{
    //         labels:['Đã Thanh Toán','Chưa thanh toán'],
    //         datasets:[{
    //             label:'Doanh thu: ',
    //             data:[stats[5]?.revenueisPay ||"0",stats[5]?.revenuenotPay|| "0"],
    //             backgroundColor: ['#2ecc71', '#e74c3c']
    //         },]
    //     }
    // },[stats[5]])

    // const piechartOptions =useMemo(()=>({
    //     responsive:true,
    //     maintainAspectRatio:false,
    //     plugins:{
    //         legend:{
    //             position:'right',
    //             labels:{
    //                 boxWidth: 15,
    //                 padding: 15,
    //                 font: {
    //                     size: 12
    //                 }
    //             }
    //         },
    //         title:{
    //             display:true,
    //             text:'Tỷ lệ doanh thu tháng hiện tại đã thanh toán',
    //             font: {
    //                 size: 16,
    //                 weight: 'bold'
    //             }
    //         },
    //         tooltip:{
    //             callbacks:{
    //                 label:function(context){
    //                     const value =context.raw *1000|| 0;
    //                     const total = context.chart._metasets[context.datasetIndex].total || 0;
    //                     const percentage=Math.round((value / total)*100);
    //                     return `${value.toLocaleString()} VND (${percentage}%)`;
    //                 }
    //             },
    //             title:function(context){
    //                 return context[0].label;
    //             }
    //         }
    //     }
    // }),[stats])

    return ( 
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-lg text-white">
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <i className="fa-solid fa-chart-pie text-white text-xl"></i>
                        <span className="text-xl font-semibold">Statistics Overview</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                    <div className="flex items-center mb-4">
                        <i className="fa-solid fa-money-bill-trend-up text-green-400 text-xl mr-2"></i>
                        <h2 className="text-xl font-bold text-white">Revenue Chart - Last 6 Months</h2>
                    </div>
                    <div className="h-[400px] bg-gray-900 rounded-lg p-4">
                        {monthlyTrend && monthlyTrend.labels.length > 0 && 
                            <Line 
                                data={monthlyTrend} 
                                options={{
                                    ...lineChartOptions,
                                    plugins: {
                                        ...lineChartOptions.plugins,
                                        title: {
                                            ...lineChartOptions.plugins.title,
                                            text: 'Monthly Revenue Trend',
                                            color: '#fff',
                                            font: {
                                                size: 18,
                                                weight: 'bold'
                                            }
                                        },
                                        legend: {
                                            ...lineChartOptions.plugins.legend,
                                            labels: {
                                                color: '#fff',
                                                font: {
                                                    size: 12
                                                }
                                            }
                                        }
                                    },
                                    scales: {
                                        y: {
                                            ...lineChartOptions.scales.y,
                                            grid: {
                                                color: 'rgba(255, 255, 255, 0.1)'
                                            },
                                            ticks: {
                                                color: '#fff',
                                                callback: function(value) {
                                                    const valuereal = value;
                                                    return `$${valuereal}`;
                                                }
                                            }
                                        },
                                        x: {
                                            grid: {
                                                color: 'rgba(255, 255, 255, 0.1)'
                                            },
                                            ticks: {
                                                color: '#fff'
                                            }
                                        }
                                    }
                                }}
                            />
                        }
                    </div>
                    <div className="mt-4 text-sm text-gray-400 text-center">
                        <p>* Revenue data is shown in USD ($)</p>
                    </div>
                </div>

                {/* User Statistics Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                    <div className="flex items-center mb-6">
                        <i className="fa-solid fa-users text-blue-400 text-xl mr-2"></i>
                        <div>
                            <h2 className="text-xl font-bold text-white">User Statistics</h2>
                            <p className="text-sm text-gray-400">User roles distribution</p>
                        </div>
                    </div>
                    
                    <div className="h-[400px] bg-gray-900 rounded-lg p-4">
                        {dataCount && dataCount.length > 0 && 
                            <Bar 
                                data={countsComparisonData} 
                                options={{
                                    ...barChartOptions,
                                    plugins: {
                                        ...barChartOptions.plugins,
                                        title: {
                                            ...barChartOptions.plugins.title,
                                            text: 'User Role Distribution',
                                            color: '#fff',
                                            font: {
                                                size: 18,
                                                weight: 'bold'
                                            }
                                        }
                                    },
                                    scales: {
                                        y: {
                                            ...barChartOptions.scales.y,
                                            grid: {
                                                color: 'rgba(255, 255, 255, 0.1)'
                                            },
                                            ticks: {
                                                color: '#fff'
                                            }
                                        },
                                        x: {
                                            grid: {
                                                color: 'rgba(255, 255, 255, 0.1)'
                                            },
                                            ticks: {
                                                color: '#fff'
                                            }
                                        }
                                    }
                                }}
                            />
                        }
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f1c40f] bg-opacity-20">
                                <i className="fa-solid fa-user text-[#f1c40f]"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Users</p>
                                <p className="text-lg font-bold text-white">{dataCount[0] || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3498db] bg-opacity-20">
                                <i className="fa-solid fa-user-tie text-[#3498db]"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Staff</p>
                                <p className="text-lg font-bold text-white">{dataCount[1] || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#27ae60] bg-opacity-20">
                                <i className="fa-solid fa-dumbbell text-[#27ae60]"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Trainers</p>
                                <p className="text-lg font-bold text-white">{dataCount[2] || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;