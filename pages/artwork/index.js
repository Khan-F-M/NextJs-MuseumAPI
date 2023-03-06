import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import useSWR from 'swr'
import { Row, Col, Card, Pagination } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard';

const PER_PAGE = 12;

export default function index() {
    const [page, setPage] = useState(1);
    const [artworkList, setArtworkList] = useState([]);

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error, isLoading } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    function nextPage() {
        if (page < artworkList.length) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if (data) {
            let results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }
    }, [data]);

    if (error) return <Error statusCode={404} />
    if (!artworkList) return null;

    return (
        <>
            <Row className="gy-4">
                {artworkList.length > 0

                    ? (artworkList[page - 1].map(function Func(currentObjectID) {
                       return ( 
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                       );
                    }))
                    : (
                        <Card>
                            <Card.Body>
                                <Card.Title>Nothing Here</Card.Title>
                                <Card.Text>
                                    Try searching for something else
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                }
            </Row>
            {artworkList.length > 0 && (
                <Pagination>
                    <Pagination.Prev onClick={previousPage} /> 
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} />
                </Pagination>
            )}
        </>
    )
}
