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
    {
        "name": "Bus Stations",
        "latitude": 47.761778,
        "longitude": -122.192498,
    },
];

//waypoints json
const waypoints = [
    {
        "name": "Bus Station 1",
        "latitude": 47.761698,
        "longitude": -122.192480,
        "popupText": "One of the campuses bus stations. \nRoutes serviced: 230, 239, 372, 522"
    },
    {
        "name": "Bus Station 2",
        "latitude": 47.761733,
        "longitude": -122.192421,
        "popupText": "One of the campuses bus stations. \nRoutes serviced: 105, 106, 535"
    },
];

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

    map.addSource('waypoints', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: waypoints.map(waypoint => ({
                type: 'Feature',
                properties: {
                    name: waypoint.name,
                    popupText: waypoint.popupText
                },
                geometry: {
                    type: 'Point',
                    coordinates: [waypoint.longitude, waypoint.latitude]
                }
            }))
        }
    });

    map.addLayer({
        id: 'waypoint-layer',
        type: 'circle',
        source: 'waypoints',
        paint: {
            'circle-radius': 5,
            'circle-color': '#FFD700'
        }
    });

    // Add popup functionality
    map.on('click', 'waypoint-layer', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const popupText = e.features[0].properties.popupText;

        // Ensure that if the map is zoomed out such that multiple copies of the feature are visible,
        // the popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupText)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the waypoint layer
    map.on('mouseenter', 'waypoint-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves
    map.on('mouseleave', 'waypoint-layer', () => {
        map.getCanvas().style.cursor = '';
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

//page switching
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        if (event.target.matches('.button')) {
            if (event.target.textContent === 'Home') {
                window.location.href = 'main.html';
            }
            else if (event.target.textContent === 'Directory') {
                window.location.href = 'directorypage.html';
            }
            else if (event.target.textContent === 'UW Website') {
                window.location.href = 'https://www.uwb.edu/'
            }
            else if (event.target.textContent === 'Cascadia Website') {
                window.location.href = 'https://www.cascadia.edu/'
            }
        }
    });
});