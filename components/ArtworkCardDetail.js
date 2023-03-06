import React from 'react'
import useSWR from 'swr'
import Error from 'next/error'
import { Card, Button } from "react-bootstrap"

export default function ArtworkCardDetail({ objectID }) {
    const { data, error, isLoading } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) return <Error statusCode={404} />

    if (!data) return null;

    if (isLoading) return <div>loading...</div>

    // Add the if statements later...
    return (
        <Card className='border-dark mb-3'>
            <Card.Img
                variant="top"
                src={(data.primaryImage) ? data.primaryImage : 'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'} />
            <Card.Body>
                <Card.Title>{(data.title) ? data.title : "N/A"}</Card.Title>
                <Card.Text>
                    Date: {(data.objectDate) ? data.objectDate : "N/A"}
                    <br />
                    Classification: {(data.classification) ? data.classification : "N/A"}
                    <br />
                    Medium: {(data.medium) ? data.medium : "N/A"}
                    <br />
                    <br />
                    Artist: {(data.artistDisplayName) ? (data.artistDisplayName) : "N/A"} {(data.artistWikidata_URL) ? (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >( wiki )</a>) : "" }
                    <br />
                    Credit Line: {(data.creditLine) ? (data.creditLine) : "N/A"}
                    <br />
                    Dimensions: {(data.dimensions) ? (data.dimensions) : "N/A"}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
