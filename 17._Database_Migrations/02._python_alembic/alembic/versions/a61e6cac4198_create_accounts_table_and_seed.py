"""Create accounts table and seed

Revision ID: a61e6cac4198
Revises: ca1fdc5fdb7c
Create Date: 2025-04-03 09:38:53.519602

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a61e6cac4198'
down_revision: Union[str, None] = 'ca1fdc5fdb7c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
