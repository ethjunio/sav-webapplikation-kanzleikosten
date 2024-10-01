// app.ts

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

// Create an instance of Express
const app = express();

// Define the port to run the server on
const PORT: number = parseInt(process.env.PORT || '5500', 10);

// Define the path to your static files
const publicPath: string = path.join(__dirname, '../public');

// Middleware to serve static files
app.use(express.static(publicPath));


// For Single Page Applications (SPA), serve index.html for all other routes
app.get('*', (req: Request, res: Response, next: NextFunction) => {
	res.sendFile(path.join(publicPath, 'index.html'), (err) => {
		if (err) {
			next(err);
		}
	});
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
