import React, { useEffect, useRef} from "react";
import Chart from "react-apexcharts";
import domtoimage from 'dom-to-image';
import fileSaver from "file-saver";

// Lot of props
function Render({graphData, shouldExport, setShouldExport, fileFormat, renderSize, graphColor, backgroundColor, borderColor, largeTextColor, smallTextColor, graphFont }) {

	// Configuring the chart
	var config = {
		options: {
			chart: {
				foreColor: smallTextColor,
				fontFamily: `${graphFont}, Helvetica, Arial, sans-serif`,
				toolbar: {
					show: false,
				},
				height: 380,
				type: "area",
				id: "areachart-2",
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
				colors: [graphColor],
			},
			series: [
				{
					data: graphData.adj_closes,
				},
			],
			fill: {
				colors:[graphColor],
				type: 'gradient',
				gradient: {
				  shade: 'dark',
				  type: "vertical",
				  shadeIntensity: 0.1,
				  opacityFrom: 1,
				  opacityTo: 0,
				  stops: [0, 100],
				  colorStops: []
				}
			  },
			labels: graphData.dates,
			xaxis: {
				tickAmount: 6
			},
			grid: {
				show: false,
			},
		},
	};

	// Listens and acts on boolean "shouldExport"
	useEffect(()=>{
		if(shouldExport){
			if(fileFormat == "PNG"){
				downloadAsPNG()
			}
			if(fileFormat == "JPG"){
				downloadAsJpeg()
			}
			if(fileFormat == "SVG"){
				downloadAsSVG()
			}
			setShouldExport(false)
		}
	}, [shouldExport])

	// Must be null first so it can be referenced in jsx
	const render = useRef(null);

    const prep = () => {
        var node =  render.current;
        var exportSize = parseInt(renderSize.replace("x", ""))
        const config = {
            width: node.clientWidth * exportSize,
            height: node.clientHeight * exportSize,
            style: {
                transform: `scale(${exportSize})`,
                'transform-origin': 'top left'
            }
        }
        return {
            node,
            config
        }
    }

	// PNG
    const downloadAsPNG = () => {
        var {
            node,
            config
        } = prep()
        domtoimage.toBlob(node, config)
            .then(function (blob) {
                fileSaver.saveAs(blob, 'tickercheck.png');
            });
    }

	// JPG
	const downloadAsJpeg = () => {
        var {
            node,
            config
        } = prep()
		config.quality = 0.85;
		domtoimage.toJpeg(node, config)
			.then(function (dataUrl) {
				var link = document.createElement('a');
				link.download = 'tickercheck.jpeg';
				link.href = dataUrl;
				link.click();
			});
    }

	// SVG
	const downloadAsSVG = () => {
        var {
            node,
            config
        } = prep()
		function filter (node) {
			return (node.tagName !== 'i');
		}
		config.filter = filter;
		domtoimage.toSvg(node, config)
			.then(function (dataUrl) {
				var link = document.createElement('a');
				link.download = 'tickercheck.svg';
				link.href = dataUrl;
				link.click();
			});
    }
	return (
		<>
			<div className="border-r-2 border-l-2 border-gray-500 p-10">
				<div
					ref={render}
					className="p-10 inline-block bg"
					style={{ backgroundColor: borderColor }}
				>
					<div className="chart rounded-lg relative" style={{backgroundColor: backgroundColor}}>
						<div className="overlay z-10 absolute ml-20 mt-7">
							<div className="ticker text-4xl apply-font-LargeText" style={{color: largeTextColor}} >{graphData.ticker}</div>
							<div className="company text-xl apply-font-SmallText" style={{color: smallTextColor}}>{graphData.company_name}</div>
						</div>
						<Chart
							options={config.options}
							series={config.options.series}
							type="area"
							width="500"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default Render;
