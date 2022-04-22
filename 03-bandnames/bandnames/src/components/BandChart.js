import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Chart, registerables } from 'chart.js';

export const BandChart = () => {
    Chart.register(...registerables);
    
    
    const { socket } = useContext( SocketContext );

    useEffect(() => {
        socket.on('bandList', (bands) => {
            crearGrafica( bands );
        });
    }, [ socket ])

    

    const crearGrafica = ( bands = []) => {
        const ctx = document.getElementById('myChart')
      
        const chartStatus = Chart.getChart("myChart");
        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map( band => band.name ),
                datasets: [{
                    label: '# de Votos',
                    data: bands.map( band => band.votes ),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
            }
        });
    }

    return (
        <canvas id="myChart"></canvas>
    )
}