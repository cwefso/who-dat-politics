//@ts-nocheck

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";


type Member = {
  id: string;
  name: string;
  party: string;
  // Add more properties as needed
};

type ApiResponse = {
  results: {
    members: Member[];
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  // Define the Congress number and chamber
  const congress = '117'; // Change to the desired Congress number
  const chamber = 'senate'; // Change to 'house' if needed

  try {
    const response = await fetch(`https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`, {
      headers: {
        'X-API-Key': process.env.PROPUBLICA_API_KEY, // Replace with your ProPublica API key
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from ProPublica API');
    }

    const data: ApiResponse = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
