CREATE OR REPLACE FUNCTION get_product_stats(
    product_id UUID DEFAULT NULL,
    time_period VARCHAR DEFAULT 'all' -- 'day', 'week', 'month', 'year', 'all'
)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    total_sales INTEGER,
    total_revenue DECIMAL(12,2),
    average_rating DECIMAL(3,2),
    review_count INTEGER,
    stock_status VARCHAR,
    low_stock BOOLEAN,
    conversion_rate DECIMAL(5,2),
    view_count INTEGER,
    added_to_cart_count INTEGER,
    added_to_wishlist_count INTEGER
) AS $$
DECLARE
    start_date TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Determine the start date based on time_period
    CASE time_period
        WHEN 'day' THEN
            start_date := NOW() - INTERVAL '1 day';
        WHEN 'week' THEN
            start_date := NOW() - INTERVAL '1 week';
        WHEN 'month' THEN
            start_date := NOW() - INTERVAL '1 month';
        WHEN 'year' THEN
            start_date := NOW() - INTERVAL '1 year';
        ELSE
            start_date := '1970-01-01'::TIMESTAMP WITH TIME ZONE; -- All time
    END CASE;

    RETURN QUERY
    WITH sales_data AS (
        SELECT 
            p.id,
            COALESCE(SUM(oi.quantity), 0) AS total_sales,
            COALESCE(SUM(oi.subtotal), 0) AS total_revenue
        FROM products p
        LEFT JOIN order_items oi ON p.id = oi.product_id
        LEFT JOIN orders o ON oi.order_id = o.id
        WHERE 
            (product_id IS NULL OR p.id = product_id) AND
            (o.created_at >= start_date OR o.id IS NULL) AND
            (o.status != 'cancelled' OR o.id IS NULL)
        GROUP BY p.id
    ),
    review_data AS (
        SELECT 
            p.id,
            COALESCE(AVG(r.rating), 0) AS average_rating,
            COUNT(r.id) AS review_count
        FROM products p
        LEFT JOIN reviews r ON p.id = r.product_id
        WHERE 
            (product_id IS NULL OR p.id = product_id) AND
            (r.created_at >= start_date OR r.id IS NULL)
        GROUP BY p.id
    ),
    wishlist_data AS (
        SELECT 
            p.id,
            COUNT(wi.product_id) AS wishlist_count
        FROM products p
        LEFT JOIN wishlist_items wi ON p.id = wi.product_id
        LEFT JOIN wishlists w ON wi.wishlist_id = w.id
        WHERE 
            (product_id IS NULL OR p.id = product_id) AND
            (wi.added_at >= start_date OR wi.product_id IS NULL)
        GROUP BY p.id
    ),
    cart_data AS (
        SELECT 
            p.id,
            COUNT(ci.product_id) AS cart_count
        FROM products p
        LEFT JOIN cart_items ci ON p.id = ci.product_id
        LEFT JOIN carts c ON ci.cart_id = c.id
        WHERE 
            (product_id IS NULL OR p.id = product_id) AND
            (ci.added_at >= start_date OR ci.product_id IS NULL)
        GROUP BY p.id
    )
    SELECT 
        p.id,
        p.name,
        COALESCE(sd.total_sales, 0)::INTEGER AS total_sales,
        COALESCE(sd.total_revenue, 0)::DECIMAL(12,2) AS total_revenue,
        COALESCE(rd.average_rating, 0)::DECIMAL(3,2) AS average_rating,
        COALESCE(rd.review_count, 0)::INTEGER AS review_count,
        CASE 
            WHEN p.stock_quantity = 0 THEN 'Out of stock'
            WHEN p.stock_quantity < 10 THEN 'Low stock'
            ELSE 'In stock'
        END AS stock_status,
        (p.stock_quantity < 10 AND p.stock_quantity > 0)::BOOLEAN AS low_stock,
        -- A placeholder for conversion rate (views to orders)
        -- In a real application, you would track product views
        CASE 
            WHEN COALESCE(cd.cart_count, 0) = 0 THEN 0
            ELSE (COALESCE(sd.total_sales, 0) / COALESCE(cd.cart_count, 1) * 100)
        END::DECIMAL(5,2) AS conversion_rate,
        0::INTEGER AS view_count, -- Placeholder for view count (requires additional tracking)
        COALESCE(cd.cart_count, 0)::INTEGER AS added_to_cart_count,
        COALESCE(wd.wishlist_count, 0)::INTEGER AS added_to_wishlist_count
    FROM products p
    LEFT JOIN sales_data sd ON p.id = sd.id
    LEFT JOIN review_data rd ON p.id = rd.id
    LEFT JOIN wishlist_data wd ON p.id = wd.id
    LEFT JOIN cart_data cd ON p.id = cd.id
    WHERE product_id IS NULL OR p.id = product_id
    ORDER BY sd.total_revenue DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql;

-- Helper function to get product stats with specific filters
CREATE OR REPLACE FUNCTION get_top_selling_products(
    limit_count INTEGER DEFAULT 10,
    time_period VARCHAR DEFAULT 'month'
)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    total_sales INTEGER,
    total_revenue DECIMAL(12,2),
    average_rating DECIMAL(3,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ps.id,
        ps.name,
        ps.total_sales,
        ps.total_revenue,
        ps.average_rating
    FROM get_product_stats(NULL, time_period) ps
    ORDER BY ps.total_sales DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;