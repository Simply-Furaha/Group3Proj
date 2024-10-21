import React, { useEffect, useState} from 'react';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';
// import './Agent.css';

function AgentPage() {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/agents")
            .then((r) => r.json())
            .then(data => setAgents(data))
            .catch(error => console.error('Error fetching agents:', error));
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <h1>Agents List</h1>
                <ul>
                    {agents.map(agent => (
                        <li key={agent.id}>
                            <h3>{agent.username}</h3>
                            <p>Email: {agent.email}</p>
                            <p>Phone: {agent.phone}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Do you want to be an agent? </h1>
                <Link to="/signup">
                    <button className="btn">Sign up</button>
                </Link>
            </div>
        </div>

            
    );
};

export default AgentPage;