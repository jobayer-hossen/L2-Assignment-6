import React, { useEffect, useState } from 'react';

interface Ride {
    id: string;
    driver: string;
    passenger: string;
    origin: string;
    destination: string;
    status: string;
    date: string;
}

const AllRides: React.FC = () => {
    const [rides, setRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Replace with your API endpoint
        fetch('/api/rides')
            .then(res => res.json())
            .then(data => {
                setRides(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div>
            <h2>All Rides</h2>
            {loading ? (
                <p>Loading rides...</p>
            ) : rides.length === 0 ? (
                <p>No rides found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Driver</th>
                            <th>Passenger</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rides.map(ride => (
                            <tr key={ride.id}>
                                <td>{ride.id}</td>
                                <td>{ride.driver}</td>
                                <td>{ride.passenger}</td>
                                <td>{ride.origin}</td>
                                <td>{ride.destination}</td>
                                <td>{ride.status}</td>
                                <td>{ride.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllRides;