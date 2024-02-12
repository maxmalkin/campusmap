
//api token:
mapboxgl.accessToken = 'pk.eyJ1IjoibWF4bWFsa2luIiwiYSI6ImNsczVpamxlODFoaG0ycnBhdzd1bTY4amMifQ.Rbe4ueQeIAE6AzCCbtIpqQ';

//builings json
const buildings = [
    {
        "name": "UW 1",
        "latitude": 47.758663,
        "longitude": -122.190643,
    },
    {
        "name": "UW 2",
        "latitude": 47.758687,
        "longitude": -122.191351,
    },
    {
        "name": "Discovery Hall \n(DISC)",
        "latitude": 47.759038,
        "longitude": -122.191931,
    },
    {
        "name": "Innovation \nHall \n(INV)",
        "latitude": 47.760400,
        "longitude": -122.192551,
    },
    {
        "name": "CC 1",
        "latitude": 47.760735,
        "longitude": -122.191509,
    },
    {
        "name": "CC 2",
        "latitude": 47.761226,
        "longitude": -122.191869,
    },
    {
        "name": "CC 3",
        "latitude": 47.761193,
        "longitude": -122.192626,
    },
    {
        "name": "Library \n(LB)",
        "latitude": 47.759829,
        "longitude": -122.191434,
    },
    {
        "name": "Activities \n& Recreation \nCenter \n(ARC)",
        "latitude": 47.759948,
        "longitude": -122.190274,
    },
    {
        "name": "North Creek \nEvent Center \n(NCEC)",
        "latitude": 47.760299,
        "longitude": -122.190565,
    },
]

//map init
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-122.191392, 47.759708], //map center
    zoom: 17,
    pitch: 20,
    maxBounds: [
        [-122.196920, 47.757326], // SW bound
        [-122.187897, 47.763077]  // NE bound
    ],
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

map.on('load', () => {
    
    //remove default layers by iteration
    var layers = map.getStyle().layers;
    layers.forEach(function(layer) {
        if (layer.type === 'symbol' && layer.layout['text-field']) {
            map.setLayoutProperty(layer.id, 'visibility', 'none');
        }
    });

    //add building labels from buildings object
    map.addSource('buildings', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: buildings.map(building => ({
                type: 'Feature',
                properties: {
                    name: building.name,
                },
                geometry: {
                    type: 'Point',
                    coordinates: [building.longitude, building.latitude],
                },
            })),
        },
    });
    map.addLayer({
        id: 'building-labels',
        type: 'symbol',
        source: 'buildings',
        layout: {
            'text-field': ['get', 'name'],
            'text-size': 12,
            'text-anchor': 'center',
        },
        paint: {
            'text-color': '#FFD700',
        },
    });

    // building nav buttons
    const buildingButtonsContainer = document.getElementById('building-buttons');
    buildings.forEach(building => {
        const button = document.createElement('button');
        button.textContent = building.name;
        button.classList.add('building-button');
        button.addEventListener('click', () => {
            map.flyTo({
                center: [building.longitude, building.latitude],
                zoom: 19,
                essential: true
            });
        });
        buildingButtonsContainer.appendChild(button);
    });
});



/* 
// old 

MANUAL LABELS
    // add map layer for building labels
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
                            coordinates: [-122.190274, 47.759948]
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
            'text-anchor': 'center',
        },
        paint: {
            'text-color': '#FFD700', 
        },
    });
    */


// Add a marker for UW Bothell campus
// new mapboxgl.Marker()
//     .setLngLat([-122.1911463, 47.758586])
//     .addTo(map);
