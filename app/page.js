"use client"
import { useContext, useEffect, useState } from 'react';
import BusinessList from '@/components/Home/BusinessList';
import OSMMapView from '@/components/Home/OSMMapView';
import SkeltonLoading from '@/components/SkeltonLoading';
import { UserLocationContext } from '@/context/UserLocationContext';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import fetchPlacesMapbox from '@/utils/fetchPlacesMapbox';

export default function Home() {
  const { data: session } = useSession();
  const [radius, setRadius] = useState(1000); // Bán kính tìm kiếm
  const [businessList, setBusinessList] = useState([]);
  const [businessListOrg, setBusinessListOrg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const router = useRouter();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (!session?.user) {
      router.push('/Login');
    }
  }, [session]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`TAU Ở ĐÂY NÈ: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setCoordinates({ latitude: latitude.toFixed(4), longitude: 105.7827 });
      },
      (error) => {
        console.error("Error getting current location", error);
      }
    );
  }, []);

  useEffect(() => {
    const { latitude, longitude } = coordinates;
    if (latitude && longitude) {
      fetchPlaces(latitude, longitude);
    }
  }, [coordinates]);

  const fetchPlaces = async (lat, lng) => {
    setLoading(true);
    try {
      const places = await fetchPlacesMapbox('bún', 105.7830, 21.0408, radius);
      console.log(places);
      // setBusinessList(places);
      // setBusinessListOrg(places);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching places:', error);
      setLoading(false);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 '>
      <div className='p-3'>
      </div>
      <div className='col-span-3'>
        <OSMMapView businessList={businessList} />
        <div className='md:absolute mx-2 w-[90%] md:w-[74%] bottom-36 relative md:bottom-3'>
          {!loading ? <BusinessList businessList={businessList} />
            :
            <div className='flex gap-3'>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <SkeltonLoading key={index} />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
