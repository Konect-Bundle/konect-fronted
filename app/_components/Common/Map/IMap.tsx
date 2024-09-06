"use client";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { Konect } from "@/app/_core/models/Konect";
import { TbCircleLetterKFilled } from "react-icons/tb";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#929292",
            },
        ],
    },
    {
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ffffff",
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#f5f5f5",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#bdbdbd",
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ffffff",
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#141313",
            },
            {
                weight: 8,
            },
        ],
    },
    {
        featureType: "poi",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#e5e5e5",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
    {
        featureType: "road",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#ffffff",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#dadada",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
            {
                color: "#e5e5e5",
            },
        ],
    },
    {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#c9c9c9",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ebebeb",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
];
interface IMapProps extends React.PropsWithChildren {
    googleKey: string;
    konects: Konect[];
}

interface CustomMarkerProps {
    position: google.maps.LatLngLiteral;
    children: React.ReactNode;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position, children }) => {
    return (
        <OverlayView
            position={position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <div style={{ transform: "translate(-50%, -100%)" }}>
                {children}
            </div>
        </OverlayView>
    );
};

const IMap: React.FC<IMapProps> = ({ children, konects, googleKey }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: googleKey,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map: any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        // const bounds = new window.google.maps.LatLngBounds(center);

        // map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={1}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                zoomControl: false,
                minZoom: 1,
                scrollwheel: true,
                fullscreenControl: false,
                mapTypeControl: false,
                styles: mapStyle,
                streetViewControl: false,
            }}
        >
            {/* Child components, such as markers, info windows, etc. */}
            {konects?.map((konect, i) => {
                return (
                    <CustomMarker
                        key={i}
                        position={{
                            lat: konect.ko_ip_locations.lat!,
                            lng: konect.ko_ip_locations.lon!,
                        }}
                    >
                        {/* Vous pouvez insérer n'importe quel composant JSX ici */}
                        <TbCircleLetterKFilled className="text-yellow-900" />
                    </CustomMarker>

                    // <Marker
                    //     key={i}
                    //     position={{
                    //         lat: konect.ko_ip_locations.lat!,
                    //         lng: konect.ko_ip_locations.lon!
                    //     }}
                    //     icon={{
                    //         // path: google.maps.SymbolPath.CIRCLE,

                    //         url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Location_dot_black.svg/640px-Location_dot_black.svg.png',
                    //         fillColor: '#ffffff',
                    //         strokeColor: '#ffffff',
                    //         scaledSize: new window.google.maps.Size(8, 8),

                    //     }}
                    // >
                    // </Marker>
                );
            })}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default IMap;
