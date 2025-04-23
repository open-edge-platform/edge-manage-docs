Scalability
===========

Edge Infrastructure Manager components are designed to be scalable and to
support a large fleet of devices. This section provides an overview of the
scalability considerations, the importance of scalability for the project, and
the key mechanisms at the ground.

Edge Infrastructure Manager has different scaling dimensions: onboarding (Day
0), steady state (Day 1) and upgrade operations (Day 2). Currently Edge
Infrastructure Manager has been demonstrated to work at 10,000 provisioned edge
nodes (in steady state during Day 1) for AWS deployment and 2000 provisioned
edge devices for on-premises deployment.  As of writing, the system has been
tested to work with 50 concurrently onboarded nodes (Day 0 operations) and 1000
concurrent upgrades during Day 2 activities.

Scalability is also addressed from a manageability point of view relieving the
operator from the burden of managing each device one by one as the operator can
manage the entire fleet of devices as a single entity.

Scalability Considerations
--------------------------
To achieve scalability, we must consider all components and their architecture
within our system.

**Data Persistency layer:** The Edge Infrastructure Manager relies on a
SQL database, specifically Postgres*, which must be properly configured
and optimized for scale. Postgres offers multiple scaling options, including
sharding and read-only replicas. In its cloud deployment, the Edge
Infrastructure Manager utilizes `AWS RDS* <https://aws.amazon.com/rds/>`_,
providing a scalable and highly available Postgres implementation.

**Inventory Component:** This is the closest component to the data persistence
layer, and it's used by all other components. To optimize database access, we
should:

- Avoid unnecessary queries, and properly design queries, in such a way to
  avoid the N+1 problem.

- Reduce physical database access by introducing ORM-level caches.

- Ensure CRUD operations are fast by keeping business logic out of the
  Inventory.

- Validate input statically rather than relying on current status of the
  database.

- Utilize database primitives to avoid re-implementing already optimized
  operations (i.e., using foreign keys, constraints, etc.).

- Minimize custom code by leveraging ORM capabilities (i.e., exploit the ORM
  framework to handle eager loading of linked resources).

- Optimize heavy queries not efficiently handled by the ORM layer through
  custom APIs (RPCs) and SQL queries.

**REST API Component:** The REST API serves as the external access layer to
the data model. It is stateless and horizontally scalable, implementing
limited business logic and stateless input validation to ensure fast CRUD
operations while enforcing security and access control. Heavy hitter APIs
should be optimized by introducing caching layers.

**Resource Managers (RMs):** RMs implement the system's business logic, are
stateless, and horizontally scalable. They follow the reconciliation paradigm,
inspired by Kubernetes' control plane architecture, to design resilient
distributed control planes. RMs use events from Inventory as triggers for their
"level-based" business logic. They drive access to the persistence layer and
should avoid unnecessary writes by ensuring reads are performed before writes.
Writes are detrimental to performance due to locks, transaction log entries,
disk access, and cache invalidation. RMs should minimize database access by
introducing caching layers and avoiding redundant reads or writes.

**Hierarchies and Top-Down Policies:** These constructs help manage a fleet of
devices at scale, delivering automation and agility to users. They solve the
problem of executing iterative, error-prone, time-consuming tasks that would
otherwise require scripting or manual changes to each leaf abstraction. While
acceptable in small scenarios, this process is error-prone and does not
guarantee consistency across the infrastructure.

Scalability Mechanisms
----------------------

To achieve scalability targets, the Edge Infrastructure Manager components
implement several optimization techniques. These include caching, a fine-tuned
ORM framework, optimized queries, and custom APIs. The code is designed to
perform minimal operations and rely on the current state of the system rather
than state changes.

Caching is extensively used across components to minimize unnecessary database
reads and reduce operation latency. There are two types of caches: greedy and
passive. Greedy caches perform eager loading of resources, while passive caches
store the results of read operations.

The ORM framework employed in the project efficiently handles eager loading of
data, preventing the N+1 queries problem. Additionally, the Resource Managers'
code is optimized to avoid unnecessary database writes, which helps maintain
cache validity.

Various SQL database primitives are utilized to enforce table-level invariants,
such as field uniqueness, foreign keys, and constraints.

The Resource Managers architecture does not require strong guarantees from the
notification system, such as message durability and ordering. Consequently,
events can be lost or delivered out of order, serving merely as indicators of
system changes.

Inventory operations are typically resource-oriented, and the Inventory service
interface is designed to be agnostic to the resources it manages. Complex data
processing operations are supported by optimized queries and, when necessary,
custom APIs (RPCs). These operations are designed to be efficient, avoiding the
naive approach that might require the client to perform N+1 operations and
process the data before presenting results.

Inventory supports load balancing of read operations across multiple read-replicas
provided by the DBMS.
