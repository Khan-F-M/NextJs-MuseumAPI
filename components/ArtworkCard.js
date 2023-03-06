import React from 'react'
import useSWR from 'swr'
import Error from 'next/error'
import {Card, Button} from 'react-bootstrap'
import Link from 'next/link'

export default function ArtworkCard({ objectID }) {

    const { data, error, isLoading } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) return <Error statusCode={404} />

    if (!data) return null;

    if (isLoading) return <div>loading...</div>

    // Add the if statements later...
    return (
        <Card className='text-white bg-dark mb-3'>
            <Card.Img
                variant="top"
                src={(data.primaryImageSmall) ? data.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'} />
            <Card.Body>
                <Card.Title>{(data.title) ? data.title : "N/A"}</Card.Title>
                <Card.Text>
                    Date: {(data.objectDate) ? data.objectDate : "N/A"}
                    <br />
                    Classification: {(data.classification) ? data.classification : "N/A"}
                    <br />
                    Medium: {(data.medium) ? data.medium : "N/A"}
                </Card.Text>
                <Link href={`artwork/${data.objectID}`} passHref legacyBehavior>
                    <Button variant="outline-light">{data.objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
