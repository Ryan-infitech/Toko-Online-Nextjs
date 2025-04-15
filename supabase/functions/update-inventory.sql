CREATE OR REPLACE FUNCTION update_inventory(product_id UUID, quantity INTEGER, operation VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    current_stock INTEGER;
    success BOOLEAN := FALSE;
BEGIN
    -- Get current stock quantity
    SELECT stock_quantity INTO current_stock
    FROM products
    WHERE id = product_id;
    
    -- Perform operation based on parameter
    CASE operation
        WHEN 'decrease' THEN
            -- Check if we have enough stock
            IF current_stock >= quantity THEN
                UPDATE products 
                SET 
                    stock_quantity = stock_quantity - quantity,
                    updated_at = NOW()
                WHERE id = product_id;
                success := TRUE;
            END IF;
        WHEN 'increase' THEN
            UPDATE products 
            SET 
                stock_quantity = stock_quantity + quantity,
                updated_at = NOW()
            WHERE id = product_id;
            success := TRUE;
        WHEN 'set' THEN
            IF quantity >= 0 THEN
                UPDATE products 
                SET 
                    stock_quantity = quantity,
                    updated_at = NOW()
                WHERE id = product_id;
                success := TRUE;
            END IF;
    END CASE;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql;

-- Function to properly handle order status changes
CREATE OR REPLACE FUNCTION handle_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- When order changes to 'cancelled', return items to inventory
    IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
        -- Add items back to inventory
        UPDATE products p
        SET stock_quantity = p.stock_quantity + oi.quantity
        FROM order_items oi
        WHERE oi.order_id = NEW.id AND oi.product_id = p.id;
    
    -- When order changes from 'cancelled' to something else
    ELSIF OLD.status = 'cancelled' AND NEW.status != 'cancelled' THEN
        -- Check if we have enough inventory for all items
        IF EXISTS (
            SELECT 1 FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = NEW.id AND p.stock_quantity < oi.quantity
        ) THEN
            RAISE EXCEPTION 'Insufficient inventory to reactivate order';
        END IF;
        
        -- Remove items from inventory again
        UPDATE products p
        SET stock_quantity = p.stock_quantity - oi.quantity
        FROM order_items oi
        WHERE oi.order_id = NEW.id AND oi.product_id = p.id;
    END IF;
    
    -- Record the status change in history
    INSERT INTO order_status_history (order_id, status, comment, created_by)
    VALUES (NEW.id, NEW.status, 'Status changed from ' || OLD.status || ' to ' || NEW.status, NULL);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS order_status_change_trigger ON orders;
CREATE TRIGGER order_status_change_trigger
AFTER UPDATE OF status ON orders
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION handle_order_status_change();