import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import axios from 'axios';
import { TMapMarkers } from "../../connectm-client/redux/models";
import Marker from "./marker";

interface GoogleMapState {
  mapMarkers: TMapMarkers[],
  center: {
    lat: number,
    lng: number
  },
  zoom: number
}

const ClusterMarker = ({ children }: any) => children;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAtQHyv4wnMJuHdzJwxtj6nT5D_ZQHF_Dg';

export default function GoogleMap(props: GoogleMapState) {
  const mapRef: any = useRef(null);
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(7);

  useEffect(() => {
    setZoom(zoom)

  }, [props.zoom, props.center])

  const points = props.mapMarkers?.length
    ? props.mapMarkers.map((motobike: TMapMarkers) => ({
      type: "Feature",
      properties: {
        cluster: false,
        frameId: motobike.frameId,
        timestamp: motobike.timestamp,
        isActive: motobike.isActive,
        customerName: motobike.customerName
      },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(motobike.lng as any),
          parseFloat(motobike.lat as any)
        ]
      }
    }))
    : [];

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 19, minPoints: 25 }
  });

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_APIKEY }}
        defaultCenter={{ lat: 22, lng: 77 }}
        center={props.center}
        zoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ] as any);
        }}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
            frameId,
            timestamp,
            isActive,
            customerName

          } = cluster.properties;

          if (isCluster) {
            return (
              <ClusterMarker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 40}px`,
                    height: `${10 + (pointCount / points.length) * 40}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      19
                    );
                    mapRef?.current.setZoom(expansionZoom);
                    mapRef?.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  <b>{pointCount}</b>
                </div>
              </ClusterMarker>
            );
          }

          return (
            <Marker
              key={`frameId-${frameId}`}
              lat={latitude}
              lng={longitude}
              frameId={frameId}
              isActive={isActive}
              timestamp={timestamp}
              customerName={customerName}
              color={isActive ? "#41A3C9" : "#3D487D"}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
