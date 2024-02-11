
//api token:
mapboxgl.accessToken = 'pk.eyJ1IjoibWF4bWFsa2luIiwiYSI6ImNsczVpamxlODFoaG0ycnBhdzd1bTY4amMifQ.Rbe4ueQeIAE6AzCCbtIpqQ';


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-122.191392, 47.759708], //map center
    zoom: 17,
    pitch: 6,
    maxBounds: [
        [-122.196920, 47.757326], // SW bound
        [-122.187897, 47.763077]  // NE bound
    ],
});
map.addControl(new mapboxgl.NavigationControl(), 'top-right');


map.on('load', () => {
    
    map.addLayer({
        id: 'building-labels',
        type: 'symbol',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {
                            name: 'UW 2',
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [-122.191351, 47.758687], 
                        },
                    },
                    {
                    type: 'Feature',
                    properties: {
                        name: 'Discovery Hall \n (DISC)',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-122.191931 ,47.759038]
                    }
                    },
                    {
                        type: 'Feature',
                        properties: {
                            name: 'UW 1',
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [-122.190643, 47.758663]
                        }
                    },
                    {
                        type: 'Feature',
                        properties: {
                            name: 'Library \n (LB)',
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [-122.191434, 47.759829]
                        }
                    },
                    {
                        type: 'Feature',
                        properties: {
                            name: 'Activities \n& Recreation \nCenter \n(ARC)',
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [-122.190274, 47.760042]
                        }
                    },
                    {
                        type: 'Feature',
                        properties: {
                            name: 'Library \n (LB)',
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [-122.191434, 47.759829]
                        }
                    },
                ],
            },
        },
        layout: {
            'text-field': ['get', 'name'],
            'text-size': 12,
            'text-anchor': 'top',
        },
        paint: {
            'text-color': '#FFD700', 
        },
    });
});


// Add a marker for UW Bothell campus
// new mapboxgl.Marker()
//     .setLngLat([-122.1911463, 47.758586])
//     .addTo(map);
