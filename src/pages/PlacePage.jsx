import React  from 'react'
import HomeLayout from '../components/Layouts/HomeLayout'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import Spinner from '../components/Spinner';
import {Typography, Rate} from 'antd'
import Map from '../components/Map';
import Slider from "react-slick";
import PlaceCard from '../components/PlaceCard';
import RatingForm from '../components/forms/RatingForm'

function NearbyPlace({id}){

    const { data, isError, isLoading } = useFetch(`places/${id}/nearby`);
   
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: true,
        padding: "10px",
        className: 'slides',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    if(isError){
        return null;
    }

    if(data){
        return (
            <>
                <Typography.Paragraph>Nearby Destinations</Typography.Paragraph>
                <Slider {...settings}>
                    {
                        data.data.map(place=>{
                            return (
                                <div className="px-1">
                                    <PlaceCard place={place} />
                                </div>
                            )
                        })
                    }
                </Slider>
            </>
        );
    }
    return <Slider />
}


export default function PlacePage() {
    const {id} = useParams();
    const { data: place, isError, isLoading } = useFetch(`places/${id}`);
    const { data: reviewAgr, isError: aggrError, isLoading: aggrLoading } = useFetch(`places/${id}/reviews/aggragrate`)
    console.log(reviewAgr)
    if(place){
       return(
        <HomeLayout>
        <div className="row">
            <div className="col-lg-8">
                <img src={place.image}  style={{ width:"100%", objectFit:"cover", objectPosition:"center" }}/>
            </div>
            <div className="col-lg-4">
                <Typography.Title level={2}>
                    {place.name}
                </Typography.Title>
                <Typography.Paragraph>
                    {place.description}
                </Typography.Paragraph>
                
                <span>
                    Average Rating: <Rate disabled defaultValue={reviewAgr?.average[0]?.average || 0} /> ({reviewAgr?.average[0]?.average || 0}) stars.
                </span>
                
                <RatingForm id={place.id} />

            </div>
        </div>
        <div className="container-fluid py-4">
            <NearbyPlace id={id}/>
        </div>
        <div className="container-fluid py-4 ">
            <Map places={[place]} center={[place.location.coordinates[1], place.location.coordinates[0]]}/>
        </div>
    </HomeLayout>
       )
    }

    return (
        <HomeLayout>
            <Spinner />
        </HomeLayout>
    )
}
