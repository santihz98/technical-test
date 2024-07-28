import React from 'react';

function InteractionsList({ interactions }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Interactions</h2>
      <ul className="mt-4 space-y-4">
        {interactions.map((interaction, index) => (
          <li key={index} className="bg-white shadow overflow-hidden rounded-md p-4">
            <p><strong>Question:</strong> {interaction.question}</p>
            <p><strong>Context:</strong> {interaction.context}</p>
            <p><strong>Answer:</strong> {interaction.answer}</p>
            <p><strong>Score:</strong> {interaction.score}</p>
            <p><strong>Start:</strong> {interaction.start}</p>
            <p><strong>End:</strong> {interaction.end}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InteractionsList;
