import "reflect-metadata";
import { createServer } from "http";
import dotenv from "dotenv";

import { connectDB } from "./Infrastructure/Database/MongoDB";
import { app } from "./Infrastructure/Express/express";
import logger from "./Infrastructure/Logger/logger";

import { bootstrapPricingPolicies } from "./Infrastructure/Bootstrap/bootstrapPricingPolicies";
import { PricingPolicyRepository } from "./Infrastructure/Repositories/Admin/PricingPolicyRepository";
import { initSocket } from "./Infrastructure/Services/Chat/initSocket";

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

        initSocket(server);

        server.listen(port, () => {
            logger.info(`Server running at http://localhost:${port}`);
        });

    } catch (error) {
        logger.error("Failed to start server", error);
        process.exit(1);
    }
}

startServer();
