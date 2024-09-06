import React from 'react';

const HistoryPopup = ({ historyData, close }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit History</h2>
                <ul>
                    {historyData.length > 0 ? (
                        historyData.map((entry, index) => (
                            <li key={index} className="mb-2">
                                <strong>{new Date(entry.timestamp).toLocaleString()}:</strong> {entry.changes}
                            </li>
                        ))
                    ) : (
                        <p>No history available</p>
                    )}
                </ul>
                <button onClick={close}>Close</button>
            </div>
        </div>
    )
};

export default HistoryPopup;
