import "reflect-metadata";
import { createServer } from "http";
import dotenv from "dotenv";

import { connectDB } from "./Infrastructure/database/monogdb.js";
import { app } from "./Infrastructure/express/express.js";
import logger from "./Infrastructure/logger/logger.js";

import { bootstrapPricingPolicies } from "./Infrastructure/bootstrap/pricingPolicy.bootstrap.js";
import { PricingPolicyRepository } from "./Infrastructure/repositories/Admin/PricingPolicyRepository.js";

dotenv.config();

const port = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();
        logger.info("Database connected");

        const pricingPolicyRepo = new PricingPolicyRepository();
        await bootstrapPricingPolicies(pricingPolicyRepo);
        logger.info("Pricing policies bootstrap completed");

        const server = createServer(app);
        server.listen(port, () => {
            logger.info(`Server running at http://localhost:${port}`);
        });

    } catch (error) {
        logger.error("Failed to start server", error);
        process.exit(1);
    }
}

startServer();
