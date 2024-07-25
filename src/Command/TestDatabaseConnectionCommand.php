<?php
namespace App\Command;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class TestDatabaseConnectionCommand extends Command
{
    protected static $defaultName = 'app:test-database-connection'; // Ensure this is set

    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->setDescription('Test the database connection and display a message.')
            ->setHelp('This command allows you to test the database connection.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        try {
            // Attempt to connect to the database
            $this->connection->connect();
            
            if ($this->connection->isConnected()) {
                $io->success('Database connection established successfully!');
            } else {
                $io->error('Failed to establish database connection.');
            }
        } catch (Exception $e) {
            $io->error('Error: ' . $e->getMessage());
        }

        return Command::SUCCESS;
    }
}
