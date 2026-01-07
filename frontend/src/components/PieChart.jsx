import React, { useState } from 'react';
import './PieChart.css';

const PieChart = ({ data, size = 300 }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="pie-chart-empty" style={{ width: size, height: size }}>
        <p>No hay datos para mostrar</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0) {
    return (
      <div className="pie-chart-empty" style={{ width: size, height: size }}>
        <p>No hay datos para mostrar</p>
      </div>
    );
  }

  let currentAngle = -90; // Comenzar desde arriba
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    currentAngle = endAngle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
      index
    };
  });

  const radius = size / 2;
  const center = { x: radius, y: radius };
  const chartRadius = radius * 0.85;
  const innerRadius = chartRadius * 0.5; // Para hacer un donut chart

  const polarToCartesian = (angle, r) => {
    const angleInRadians = (angle * Math.PI) / 180;
    return {
      x: center.x + r * Math.cos(angleInRadians),
      y: center.y + r * Math.sin(angleInRadians)
    };
  };

  const getSlicePath = (startAngle, endAngle, outerR, innerR) => {
    const start = polarToCartesian(startAngle, outerR);
    const end = polarToCartesian(endAngle, outerR);
    const innerStart = polarToCartesian(endAngle, innerR);
    const innerEnd = polarToCartesian(startAngle, innerR);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${start.x} ${start.y}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${innerEnd.x} ${innerEnd.y}`,
      'Z'
    ].join(' ');
  };

  const getLabelPosition = (startAngle, endAngle) => {
    const middleAngle = (startAngle + endAngle) / 2;
    const labelRadius = chartRadius * 0.75;
    return polarToCartesian(middleAngle, labelRadius);
  };

  return (
    <div className="pie-chart-container">
      <svg 
        width={size} 
        height={size} 
        className="pie-chart"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Sombra del gráfico */}
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#shadow)">
          {slices.map((slice) => {
            const isHovered = hoveredIndex === slice.index;
            const currentRadius = isHovered ? chartRadius * 1.05 : chartRadius;
            const path = getSlicePath(
              slice.startAngle,
              slice.endAngle,
              currentRadius,
              innerRadius
            );

            return (
              <path
                key={slice.index}
                d={path}
                fill={slice.color}
                className="pie-slice"
                onMouseEnter={() => setHoveredIndex(slice.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  opacity: hoveredIndex !== null && hoveredIndex !== slice.index ? 0.6 : 1
                }}
              />
            );
          })}
        </g>

        {/* Centro del donut con el total */}
        <circle
          cx={center.x}
          cy={center.y}
          r={innerRadius}
          className="pie-center"
        />
        <text
          x={center.x}
          y={center.y - 10}
          textAnchor="middle"
          className="pie-center-label"
        >
          Total
        </text>
        <text
          x={center.x}
          y={center.y + 15}
          textAnchor="middle"
          className="pie-center-value"
        >
          ${total.toFixed(2)}
        </text>
      </svg>

      {/* Leyenda */}
      <div className="pie-legend">
        {slices.map((slice) => (
          <div
            key={slice.index}
            className={`pie-legend-item ${hoveredIndex === slice.index ? 'active' : ''}`}
            onMouseEnter={() => setHoveredIndex(slice.index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="pie-legend-color"
              style={{ backgroundColor: slice.color }}
            />
            <div className="pie-legend-content">
              <div className="pie-legend-label">{slice.label}</div>
              <div className="pie-legend-value">
                <span className="pie-legend-amount">${slice.value.toFixed(2)}</span>
                <span className="pie-legend-percentage">{slice.percentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
